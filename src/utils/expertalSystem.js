export const ruleBaseSystemBehavior = (response, socket) => {
    console.log('EXPERTAL', response)
    Object.keys(response).map(key => {
        if(key === 'lights' && response[key] === 'off' ){
            socket.emit('update_sensor_lights', {bool: false})
        }
        else if(key === 'lights' && response[key] === 'on' ){
            socket.emit('update_sensor_lights', {bool: true})
        }
        else if(key === 'windows' && response[key] === 'off' ){
            socket.emit('update_sensors', {bool: false, id: '4'})
            socket.emit('update_sensors', {bool: false, id: '5'})
        }
        else if(key === 'windows' && response[key] === 'on' ){
            socket.emit('update_sensors', {bool: true, id: '4'})
            socket.emit('update_sensors', {bool: true, id: '5'})
        }
        else if(key === 'alarm' && response[key] === 'on'){
            socket.emit('update_sensors', {bool: true, id: '2'})
        }
    })
}