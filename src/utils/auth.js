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

    updateUser(type, value){
        if(type === 'surname') this.user.surname = value
        else if(type === 'lastname') this.user.lastname = value
        else if(type === 'email') this.user.email = value
        return
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