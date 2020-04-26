import { isNil } from 'lodash';

class Auth{
    constructor(){
        this.auhenticated = false;
        this.user = null;
    }

    check(url, token, cb, onError){
        if(isNil(token)){
            cb();
            return;
        };
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        })
        .then(res => {
            return res.json()   
        })
        .then(data => {
            console.log('data', data)
            if(data.res === 'user verified'){
                this.auhenticated = true;
                this.user = data.user
                console.log('oo', this.user)
                cb();
            }
            else{
                onError();
            }
        })
        .catch(()=>{
            onError();
        })
    }

    logout(cb){
        this.auhenticated = false;
        this.user = null;
        cb();
    }

    isAuthentificated(){
        return this.auhenticated;
    }

    getUser(){
        return this.user;
    }
}

export default new Auth();