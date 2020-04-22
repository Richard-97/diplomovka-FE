export const ruleBaseSystemBehavior = (response, socket) => {
    Object.keys(response).map(key => {
        if(key === 'lights' && response[key] === 'off' ){
            socket.emit('update_sensor_lights', {bool: false})
        }
        else if(key === 'lights' && response[key] === 'on' ){
            socket.emit('update_sensor_lights', {bool: true})
        }
    })
}