import React, { Component, Fragment } from 'react';
import socketIOClient from 'socket.io-client';
import SensorCard from '../SensorCard/SensoreCard';
import ChatBox from '../Chatbox/Chatbox';

import { 
  rotateDoor, 
  rotateBlinds, 
  toogleLight, 
  simulateGas, 
  simulateRain, 
  simulateFire, 
  rainParticles, 
  fireParticler, 
  gasParticles, 
  quaternionRotation 
} from './functions';
import chat_icon from '../../img/icons/chat.svg';

import ControlCard from '../ControlCard/ControlCard';
import InputSlider from '../InputSlider/InputSlider';

export default class Model extends Component {
    constructor(){
      super();
      let interval1;
    }
    state = {
        socket: null,
        connected: null,
        rpiData: {},
        actions: {},
        scene: undefined,
        mixer: undefined,
        clock: new window.THREE.Clock(),
        loading: true,
        projector: undefined,
        poster3: undefined,
        sink: undefined,
        sinkBackground: undefined,
        shelfBig: undefined,
        shelfMedium: undefined,
        shelfSmall: undefined,
        cube: undefined,
        clima: undefined,
        wall1: undefined,
        wall2: undefined,
        wall3: undefined,
        wall4: undefined,
        tree1: undefined,
        tree2: undefined,
        poster: undefined,
        poster2: undefined,
        distributions1: undefined,
        distributions2: undefined,
        distributions3: undefined,
        distributions4: undefined,
        particles: undefined,
        fire_points: [],
        gas_points: [],
        rain_points: [],
        door: false, 
        blinds: 0,
        blinds_position: 5,
        test: 3.6,
        light: true,
        fire: false,
        rain: false,
        gas: false,
        direction: undefined,
        window1: undefined,
        window2: undefined,
        window1Open: false,
        window2Open: false,
        temperature: undefined,
        humidity: undefined,
        lights_on: false,
        clima_on: false,
    }

    componentDidUpdate(_, prevState) {
      if(prevState.fire !== this.state.fire){
        !this.state.fire ? this.state.scene.remove(this.state.fire_points) : fireParticler(this, window, this.state.scene);
      }
      if(prevState.gas !== this.state.gas){
        !this.state.gas ? this.state.scene.remove(this.state.gas_points) : gasParticles(this, window, this.state.scene);
      }
      if(prevState.rain !== this.state.rain){
        !this.state.rain ? this.state.scene.remove(this.state.rain_points) : rainParticles(this, window, new window.THREE.GLTFLoader(), this.state.scene);
      }
    }

    componentDidMount(){
        const scene = new window.THREE.Scene();
        this.setState({scene});
        const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
        camera.rotation.order = 'YXZ'; // the default is 'XYZ'      
        camera.position.z = 18
        camera.position.y = 20
        camera.position.x = 18

        const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.physicallyCorrectLights = true;
        renderer.gammaFactor = 2.2;
        renderer.gammaOutput = true
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xcccccc, 0 );

        var hemiLight = new window.THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
        hemiLight.intensity = this.state.light ? 0.6 : 0.2;
        hemiLight.position.set( 0, 50, 0 );  
        scene.add( hemiLight );

        var dirLight = new window.THREE.DirectionalLight( 0xffffff, 0.54 );
        dirLight.position.set( 0, 50, 0 );
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new window.THREE.Vector2(1024, 1024);
        dirLight.intensity = this.state.light ? 2 : 0.2   
        scene.add( dirLight );

        const lights = [];
        const OrbitControls = require( 'three-orbit-controls' )( window.THREE );
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.autoRotate = false;
        controls.autoRotateSpeed = -10;
        controls.screenSpacePanning = true;
        controls.update();
        let domEvents	= new window.THREEx.DomEvents(camera, renderer.domElement)

        const loader = new window.THREE.GLTFLoader();

        rainParticles(this, window, loader, scene);
        fireParticler(this, window, scene);
        gasParticles(this, window, scene);

        var axesHelper = new window.THREE.AxesHelper( 25 );
        scene.add( axesHelper );
        let door;
        let lightSwitch;
        loader.load(
            '/blender-files/test.glb',
            ( gltf ) => {
              const model = gltf.scene;
              model.castShadow = true
              
              console.log('model', gltf)
              this.setState({mixer: new window.THREE.AnimationMixer( model )})
              
              model.children.map((child, i)=>{
                if(child.name === 'Switch') lightSwitch = child;
                else if(child.name === 'Door') door = child;
                else if(child.name === 'Wall1') this.setState({wall1: child});
                else if(child.name === 'Wall2') this.setState({wall2: child});
                else if(child.name === 'Wall3') this.setState({wall3: child});
                else if(child.name === 'Wall4') this.setState({wall4: child});
                else if(child.name === 'tree') this.setState({tree1: child});
                else if(child.name === 'tree001') this.setState({tree2: child});
                else if(child.name === 'Distributions1') this.setState({distributions1: child});
                else if(child.name === 'Distributions2') this.setState({distributions2: child});
                else if(child.name === 'Distributions3') this.setState({distributions3: child});
                else if(child.name === 'Distributions4') this.setState({distributions4: child});
                else if(child.name === 'Clima') this.setState({clima: child});
                else if(child.name === 'Poster') this.setState({poster: child});
                else if(child.name === 'Poster2') this.setState({poster2: child});
                else if(child.name === 'Projector-plate') this.setState({projector: child});
                else if(child.name === 'Sink') this.setState({sink: child});
                else if(child.name === 'Sink-background') this.setState({sinkBackground: child});
                else if(child.name === 'Cube007') this.setState({cube: child});
                else if(child.name === 'Plane002') this.setState({poster3: child});
                else if(child.name === 'Shelf-big') this.setState({shelfBig: child});
                else if(child.name === 'Shelf-middle') this.setState({shelfMedium: child});
                else if(child.name === 'Shelf-small') this.setState({shelfSmall: child});
                else if(child.name === 'Window-up1') this.setState({window1: child});
                else if(child.name === 'Window-up2') this.setState({window2: child});
              })
              //this.onClickObjectHandler(door, () => rotateDoor(door, this, this.state.door), domEvents);
              //this.onClickObjectHandler(lightSwitch, () => toogleLight(lightSwitch, this, this.state.light, scene, hemiLight, dirLight), domEvents);
              gltf.scene.traverse(function (child){
                
                if(child.isMesh){
                  child.material.shading = window.THREE.FlatShading = true
                  child.material.flipY = false;
                  child.material.needsUpdate = true 
                  child.material = new window.THREE.MeshLambertMaterial({ map: child.material.map, transparent: false, side: window.THREE.DoubleSide});
                  child.material.needsUpdate = true
                  
                }
              })
              scene.add( gltf.scene );
              
            },
            ( xhr ) => {
                xhr.loaded / 13890592 * 100 > 95 && this.setState({loading: false})
            },
            ( error ) => {
                console.error( 'An error happened', error );
            },
        );
    
        this.scene = scene
        this.camera = camera
        this.lights = lights
        this.renderer = renderer

        this.mount.appendChild(this.renderer.domElement)
        this.start()

        const socket = socketIOClient('http://localhost:5000', {});
        this.setState({socket});
        socket.on('connect', data => {
          socket.emit('join', 'Server Connected to Client.');
          this.setState({connected: true});
        });
        if(this.state.connected){

        }
        this.interval1 = setInterval(() => {
            socket.emit('update_sensors_grovepi_interval')
            console.log('update grovepi')
        }, 15000);
        
        socket.on('update_actions', data=>{
          this.setState({ actions: data })
          console.log('ACTIOONS', data)
          Object.keys(data).map(key=>{
              if(key === 'window1') this.setState({ window1Open: data[key] });
              else if (key === 'window2') this.setState({ window2Open: data[key] });
              else if (key === 'smart mode') return ''
          })
        });

        socket.on('update_sensors', data=>{
            this.setState({ rpiData: data })
            Object.keys(data).map(key=>{
                if(key === 'switch_sensor'){
                  if(data[key] === 1) {
                    this.setState({clima_on:true})
                  }
                  else this.setState({clima_on: false})
                } 
                else if(key === 'lights'){
                  if(data[key] === 1){
                    this.setState({light_on: true})
                  }
                  else this.setState({light_on: false})
                  toogleLight( this.state.light_on, hemiLight, dirLight);
                }
                else if(key === 'door_sensor'){
                  if(data[key]){
                    setTimeout(() => {
                      !this.state.door && rotateDoor(door, this.state.door)
                      this.setState({door: true}) 
                    }, 500);
                  } 
                  else {
                    setTimeout(() => {
                      this.state.door && rotateDoor(door, this.state.door);
                      this.setState({door: false})
                    }, 500);
                  }
                }
                else if(key === 'fire_sensor') data[key] === 1 
                    ? setTimeout(() => {
                      this.setState({fire: false})
                    }, 500)
                    : setTimeout(() => {
                      this.setState({fire: true})
                    }, 500);
                else if (key === 'gas_sensor') data[key].data < 100 ? this.setState({gas: true}) : this.setState({gas: false})
                else if(key === 'temperature') this.setState({temperature: data[key]})
                else if(key === 'humidity') this.setState({humidity: data[key]})

            })
        })
      }

      componentWillUnmount(){
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
        this.state.socket.close();
        clearInterval(this.interval1);
      }

      start =() => {
        if (!this.frameId) this.frameId = requestAnimationFrame(this.animate)
      }      
      onClickObjectHandler(obj, callback, domEvents){
        if(Array.isArray(obj)){
          obj.forEach(o=>{
            domEvents.addEventListener(o, 'click', callback, false)
          })
        }
        else domEvents.addEventListener(obj, 'click', callback, false)
      }
      stop = () => cancelAnimationFrame(this.frameId)

      animate = () => {
        this.renderScene();
        let blinds = [];
        if(this.scene.children[3] !== undefined){
          this.scene.children[3].children.map((child, i)=>{
            if(child.name.includes('blind')) blinds.push(child)
          })
        }
        simulateRain(this.state);
        simulateFire(this.state, window);
        simulateGas(this.state, window);
        if(this.state.blinds !== this.state.blinds_position){
          rotateBlinds(blinds, this, window, this.state.blinds_position, this.state.direction)
        }
        if(this.state.mixer !== undefined){
          this.state.mixer.update(this.state.clock.getDelta())
        }
        if(this.scene.children[3] !== undefined ){
          if(this.state.clima_on){
            this.state.clima.material.color.setHex( 0x5562b6 );
          }
          else this.state.clima.material.color.setHex( 0xffffff );
          if(this.state.window1Open){
            let rotation = quaternionRotation(this.state.window1, 0,1,0.1,0, window);
            this.state.window1.rotation.x = rotation.x;
            this.state.window1.rotation.y = rotation.y;
            this.state.window1.rotation.z = rotation.z;
          }
          else{
            let rotation = quaternionRotation(this.state.window1, 0,1,0,0, window);
            this.state.window1.rotation.x = rotation.x;
            this.state.window1.rotation.y = rotation.y;
            this.state.window1.rotation.z = rotation.z;
          }
          if(this.state.window2Open){
            let rotation = quaternionRotation(this.state.window2, 0,1,0.1,0, window);
            this.state.window2.rotation.x = rotation.x;
            this.state.window2.rotation.y = rotation.y;
            this.state.window2.rotation.z = rotation.z;
          }
          else{
            let rotation = quaternionRotation(this.state.window2, 0,1,0,0, window);
            this.state.window2.rotation.x = rotation.x;
            this.state.window2.rotation.y = rotation.y;
            this.state.window2.rotation.z = rotation.z;
          }
          if(this.camera.rotation.y < 1 && this.camera.rotation.y > -1){ 
            this.state.wall2.visible = false; 
            this.state.tree1.visible = false; 
            this.state.tree2.visible = false; 
            this.state.distributions2.visible = false
            this.state.clima.visible = false
          }
          else {
            this.state.wall2.visible = true; 
            this.state.tree1.visible = true;
            this.state.tree2.visible = true;
            this.state.distributions2.visible = true;
            this.state.clima.visible = true;
          }
          if(this.camera.rotation.y < 2 && this.camera.rotation.y > 1){
            this.state.wall3.visible = false;
            this.state.poster.visible = false;
            this.state.poster2.visible = false;
            this.state.distributions3.visible = false;
          }
          else {
            this.state.wall3.visible = true;
            this.state.poster.visible = true;
            this.state.poster2.visible = true;
            this.state.distributions3.visible = true;
          }
          if((this.camera.rotation.y < 3.3 && this.camera.rotation.y > 2) || (this.camera.rotation.y < -2 && this.camera.rotation.y > -3.3)){ 
            this.state.wall1.visible = false;
            this.state.distributions1.visible = false;
            this.state.sink.visible = false;
            this.state.sinkBackground.visible = false;
            this.state.cube.visible = false;
            this.state.poster3.visible = false;
            this.state.shelfBig.visible = false;
            this.state.shelfMedium.visible = false;
            this.state.shelfSmall.visible = false;
          }
          else {
            this.state.wall1.visible = true;
            this.state.distributions1.visible = true;
            this.state.sink.visible = true;
            this.state.sinkBackground.visible = true;
            this.state.cube.visible = true;
            this.state.poster3.visible = true;
            this.state.shelfBig.visible = true;
            this.state.shelfMedium.visible = true;
            this.state.shelfSmall.visible = true;
          }
          if(this.camera.rotation.y < -1 && this.camera.rotation.y > -2){ 
            this.state.wall4.visible = false;
            this.state.distributions4.visible = false;
            this.state.projector.visible = false;
          }
          else {
            this.state.wall4.visible = true;
            this.state.distributions4.visible = true;
            this.state.projector.visible = true;
          }
        }
        
        this.frameId = window.requestAnimationFrame(this.animate)
      }

      renderScene(){ this.renderer.render(this.scene, this.camera) }

      render(){
        return (
          <Fragment>
            {
              // this.state.loading ? 
              //   <div className='model_loading'>
              //     <p>Načítavam...</p>
              //   </div>
              //   :
              //   <div className='smartmodel-controller'>
              //     <SensorCard 
              //           title='Vlhkosť'
              //           value={this.state.humidity}
              //           unit="%"
              //           hint='Najpríjemnejšia vlhkosť vzduchu pre človeka je 50-60 %.'
              //       />
              //       <SensorCard 
              //           title='Teplota'
              //           value={this.state.temperature}
              //           unit="°C"
              //           hint='Najpríjemnejšia teplota v miestnosti pre človeka je 20-23 °C.'
              //       />
              //     <ControlCard title='Rolety' >
              //       <InputSlider min={0} max={10} value={this.state.blinds_position} height='1rem' width='18rem' onLeft={()=>this.setState({direction: 'left', blinds_position: this.state.blinds_position-1})} onRight={()=>this.setState({direction: 'right', blinds_position: this.state.blinds_position+1})}/>
              //     </ControlCard>
              //   </div>
            }
            <div style={{ width: '100%', height: '100vh' }} ref={(mount) => { this.mount = mount }} />
            <ChatBox
                icon={chat_icon}
                data={this.state.rpiData}
                actions={this.state.actions}
                socket={this.state.socket}
            />
          </Fragment>
        )
      }
  }