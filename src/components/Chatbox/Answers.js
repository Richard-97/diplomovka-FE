export const generateAnswer = (gnamaker_response, rpiData, actions, socket) => {
    console.log('rpi data', rpiData)
    if(rpiData === undefined || rpiData === []) return 'Dáta nie sú k dispozícií. Opýtaj sa ešte raz prosím.'
    if(gnamaker_response === '') return '';
    console.log('AAAAA', gnamaker_response.answers[0].answer)
    switch(gnamaker_response.answers[0].answer){
        case 'temperature':
            return `Momentálna teplota je ${rpiData.temperature} stupňov celzia.`
        case 'humidity':
            return `Momentálna vlhkosť je ${rpiData.humidity} percent`;
        case 'fire':
            if(rpiData.fire_sensor === 1){
                return 'Nehrozí riziko ohňa.'
            }
            else{
                return 'Pozor horí!'
            }
        case 'gas':
            if(rpiData.gas_sensor.data < 100){
                return 'V miestnosti nie je nadmerné množstvo plynu.'
            }
            else{
                return 'Pozor! V miestnosti je nadmeré množstvo plynu.'
            }
        case 'door':
            if(rpiData.door_sensor){
                return 'Dvere sú otvorené.'
            }
            else{
                return 'Dvere sú zavreté.'
            }
        case 'motion':
            if(rpiData.motion_sensor){
                return 'V miestnosti je zaznamenaný pohyb.'
            }
            else{
                return 'V miestnosti nie je zaznamenaný pohyb.'
            }
        case 'lights on':
            if(rpiData.lights===1){
                return 'Svetlá sú zapalené.'
            }
            else{
                socket.emit('update_sensor_lights', {bool: true})
                return 'Zapínam svetlá.'
            }
        case 'lights off':
            if(rpiData.lights===0){
                return 'Svetlá sú zhasnuté.'
            }
            else{
                socket.emit('update_sensor_lights', {bool: false})
                return 'Vypýnam svetlá.'
            }
        case 'clima':
            if(rpiData.switch_sensor === 1){
                return 'Klíma je zapnutá.'
            }
            else{
                return 'Klíma je vypnutá.'
            }
        case 'window one open':
            if(actions.window1) return 'Okno číslo jedna je otvorené.'
            socket.emit('update_sensors', {bool: true, id: '4'})
            return 'Otváram okno číslo jedna.'
        case 'window one close':
            if(!actions.window1) return 'Okno číslo jedna je zatvorené.'
            socket.emit('update_sensors', {bool: false, id: '4'})
            return 'Zatváram okno číslo jedna.'
        case 'window two open':
            if(actions.window2) return 'Okno číslo dva je otvorené.'
            socket.emit('update_sensors', {bool: true, id: '5'})
            return 'Otváram okno číslo dva.'
        case 'window two close':
            if(!actions.window2) return 'Okno číslo dva je zatvorené.'
            socket.emit('update_sensors', {bool: false, id: '5'})
            return 'Zatváram okno číslo dva.'
        default: return 'Zopakuj otázku prosím.'
    }
}