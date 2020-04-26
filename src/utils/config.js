import _ from 'lodash';

export const RPI_URL = '';
export const NODEJS_URL = 'http://localhost:3000';
export const FLASK_URL = 'http://localhost:5000';

export const potenciometerDataProcess = potenciometerData => {
    if(_.isNil(potenciometerData)) return 0;
    if(potenciometerData >= 1000){
        return 10;
    }
    return parseInt(potenciometerData.toString().substring(0, 1));
}

export const updateLastActionTable = (api, userID, action, time, cb) => {
    fetch(`${api}/updateLastActionTable`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID, action, time
        })
    })
    .then(res=>res.json())
    .then(data => {
        cb();
    })
}