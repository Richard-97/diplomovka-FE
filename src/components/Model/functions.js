export const rotateDoor = (door, state) => {
    console.log('DOOR', door)
    if(state){
        door.rotateY(Math.PI/2);
    }
    else{
        door.rotateY(-Math.PI/2);
    }
}

export const rotateBlinds = (blinds, self, window, position, actPos) => {
    console.log('rotateeee', position, actPos)
    self.setState({blinds: position});

    blinds.forEach(blind=>{
        if(position > actPos){
            blind.rotateX(window.THREE.Math.degToRad((position-actPos)*18));
        }
        else{
            blind.rotateX(window.THREE.Math.degToRad(-(actPos-position)*18))
        }
        // if(direction === 'right' && position <=10) blind.rotateX(window.THREE.Math.degToRad(-18));
        // else if(direction === 'left' && position > 0) blind.rotateX(window.THREE.Math.degToRad(18));

    })
}

export const toogleLight = (state, hemilight, dirlight) => {
    if(state){
        hemilight.intensity=0.6
        dirlight.intensity = 2
    }
    else{
        hemilight.intensity=0.2
        dirlight.intensity = 0.2
    }
}

export const simulateRain = state => {
    let pCount = 5000;
    while (pCount--) {
      let particle = state.particles.vertices[pCount];
      if (particle.y < -200) {
        particle.y = 200;
        particle.velocity.y = 0;
      }
      particle.velocity.y -= Math.random() * .02;
      particle.y += particle.velocity.y;
    }
    state.particles.verticesNeedUpdate = true;
};

export const simulateFire = (state, window) => {
    state.fire_points.geometry.vertices.forEach(function(v) {
      v.y = v.y + v.velocityY;
      v.x = v.x + v.velocityX;
  
      if (v.y >= 8) {
        v.x = window.THREE.Math.randInt(-2, 2);
        v.y = 0;
      }
    });
    state.fire_points.geometry.verticesNeedUpdate = true;
  }

export const simulateGas = (state, window) => {
    state.gas_points.geometry.vertices.forEach(function(v) {
      v.y = v.y + v.velocityY;
      v.x = v.x + v.velocityX;
  
      if (v.y >= 8) {
        v.x = window.THREE.Math.randInt(-2, 2);
        v.y = 0;
      }
    });
    state.gas_points.geometry.verticesNeedUpdate = true;
}

export const rainParticles = (self, window, loader, scene) => {
    const particleCount = 5000;
    var pMaterial = new window.THREE.PointCloudMaterial({
        color: 0xFFFFFF,
        size: 0.51,
        map: loader.load(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/raindrop2.png"
            ),
            blending: window.THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            color: '#1321be'
    });

    let particles = new window.THREE.Geometry;
    for (var i = 0; i < particleCount; i++) {
        var pX = Math.random()*500 - 250,
            pY = Math.random()*500 - 250,
            pZ = Math.random()*500 - 250,
            particle = new window.THREE.Vector3(pX, pY, pZ);
        particle.velocity = {};
        particle.velocity.y = 0;
        particles.vertices.push(particle);
    }
    self.setState({particles})
    let particleSystem = new window.THREE.PointCloud(particles, pMaterial);
    self.setState({rain_points: particleSystem})
    self.state.rain && scene.add(particleSystem)
}
export const fireParticler = (self, window, scene) => {
    const fire_geometry = new window.THREE.Geometry();
    const fire_texture = new window.THREE.TextureLoader().load('http://stemkoski.github.io/Three.js/images/smokeparticle.png');
    let fire_material = new window.THREE.PointsMaterial({
      size: 5,
      map: fire_texture,
      blending: window.THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: 'rgb(223,37,37)'
    });
  
    let range = 3;
    for (let i = 0; i < 20; i++) {
      const x = window.THREE.Math.randInt(-range, range);
      const y = window.THREE.Math.randInt(-range, range);
      const z = window.THREE.Math.randInt(-range, range);
      const point = new window.THREE.Vector3(x, y, z);
      point.velocityX = window.THREE.Math.randFloat(-0.01, 0.01);
      point.velocityY = window.THREE.Math.randFloat(0.1, 0.3);
      fire_geometry.vertices.push(point);
    }
  
    let fire_points = new window.THREE.Points(fire_geometry, fire_material);
    self.setState({fire_points})
    self.state.fire && scene.add(fire_points);
}
export const gasParticles = (self, window, scene) => {
    const gas_geometry = new window.THREE.Geometry();
    const gas_texture = new window.THREE.TextureLoader().load('http://stemkoski.github.io/Three.js/images/smokeparticle.png');
    const gas_material = new window.THREE.PointsMaterial({
        size: 2,
        map: gas_texture,
        blending: window.THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        color: 'rgb(147,151,32)'
    });
      
    let range = 3;
    for (let i = 0; i < 8; i++) {
        const x = window.THREE.Math.randInt(-range, range);
        const y = window.THREE.Math.randInt(-range, range);
        const z = window.THREE.Math.randInt(-range, range);
        const point = new window.THREE.Vector3(x, y, z);
        point.velocityX = window.THREE.Math.randFloat(-0.1, 0.1);
        point.velocityY = window.THREE.Math.randFloat(0.1, 0.3);
        gas_geometry.vertices.push(point);
    }
      
    let gas_points = new window.THREE.Points(gas_geometry, gas_material);
    self.setState({gas_points})
    self.state.gas && scene.add(gas_points);
}
export const quaternionRotation = (object, q1, q2, q3, q4, window) => {
    let quat = new window.THREE.Quaternion(q1, q2, q3, q4);
    let rotation = new window.THREE.Euler().setFromQuaternion(quat, "XYZ");
    return rotation;
}