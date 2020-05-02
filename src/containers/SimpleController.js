import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import SensorCard from '../components/SensorCard/SensoreCard';
import ControlCard from '../components/ControlCard/ControlCard';
import SimpleCard from '../components/SimpleCard/SimpleCard';
import InfoCard from '../components/InfoCard/InfoCard';
import ChatBox from '../components/Chatbox/Chatbox';
import Loader from '../components/Loader/Loader';

import chat_icon from '../img/icons/chat.svg';
import light_on from '../img/icons/light_on.svg';
import light_off from '../img/icons/light_off.svg';
import window_open from '../img/icons/window_open.svg';
import window_close from '../img/icons/window_close.svg';
import door_open from '../img/icons/door_open.svg';
import door_close from '../img/icons/door_close.svg';
import clima_on from '../img/icons/clima_on.svg';
import smart_mode_on from '../img/icons/smart_mode_on.svg';
import smart_mode_off from '../img/icons/smart_mode_off.svg';
import InputSlider from '../components/InputSlider/InputSlider';
import motion_icon from '../img/icons/motion.svg';

import { 
    potenciometerDataProcess, 
    updateLastActionTable 
} from '../utils/config';

export default function SimpleController({ user, api, nodejsApi }) {

    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [rpiData, setRpiData] = useState({});
    const [actions, setActions] = useState({});

    const [temperature, setTemperature] = useState(undefined);
    const [humidity, setHumidity] = useState(undefined);
    const [mainLight, setMainLight] = useState(false);
    const [clima, setClima] = useState(false);
    const [door, setDoor] = useState(false);
    const [window1, setWindow1] = useState(false);
    const [window2, setWindow2] = useState(false);
    const [gas, setGas] = useState(false);
    const [fire, setFire] = useState(false);
    const [smartMode, setSmartMode] = useState(false);
    const [motion, setMotion] = useState(false);

    useEffect(()=>{
        const socket = socketIOClient(api, {});
        setSocket(socket);
        socket.on('connect', data => {
            socket.emit('join', 'Server Connected to Client.');
            setConnected(true);
        });
        if(connected){

        }
        // const interval = setInterval(() => {
        //     socket.emit('update_sensors_grovepi_interval')
        //     console.log('update grovepi')
        // }, 15000);

        socket.on('update_actions', data=>{
            setActions(data);
            Object.keys(data).map(key=>{
                if(key === 'window1') setWindow1(data[key]);
                else if (key === 'window2') setWindow2(data[key]);
                else if (key === 'smart_mode') setSmartMode(data[key]);
            })
        });

        socket.on('update_sensors', data=>{
            setRpiData(data);
            console.log('RPI data', data)
            Object.keys(data).map(key=>{
                //if(key === 'lights') setMainLight(data[key]===1)
                if(key === 'temperature') setTemperature(data[key])
                else if(key === 'humidity') setHumidity(data[key])
                else if (key === 'switch_sensor') setClima(data[key] === 1);
                else if(key === 'fire_sensor') data[key] === 1 ? setFire(false) : setFire(true)
                else if (key === 'gas_sensor') data[key].data >100 ? setGas(true) : setGas(false)
                else if (key === 'door_sensor') setDoor(data[key])
                else if (key === 'window1') setWindow1(data[key])
                else if (key === 'window2') setWindow2(data[key])
                else if(key === 'motion_sensor') setMotion(data[key])
            })
        });
        return () => {
            //clearInterval(interval);
        }
        }, []);

    useEffect(()=>{
        if(socket !== null){
            updateLastActionTable(api, user.id, `${!mainLight ? 'Vypnutie' : 'Zapnutie'} svetla`, new Date(), () =>{
                socket.emit('update_sensor_lights', {bool: mainLight})
            });
        }
    }, [mainLight])

    useEffect(()=>{
        socket !== null &&
            updateLastActionTable(api, user.id, `${!window1 ? 'Zatvorenie' : 'Otvorenie'} okna č. 1`, new Date(), () =>{
                socket.emit('update_sensors', {bool: window1, id: '4'})
            });
    }, [window1])
    useEffect(()=>{
        if(socket !== null){
            updateLastActionTable(api, user.id, `${window2 ? 'Otvorenie' : 'Zatvorenie'} okna č. 2`, new Date(), () => {
                socket.emit('update_sensors', {bool: window2, id: '5'})
            })
        }
    }, [window2])
    useEffect(() => {
        if(socket !== null){
            updateLastActionTable(api, user.id, `${window2 ? 'Zapnutie smart-modu': 'Vypnutie smart-modu'}`, new Date(), () => {
                socket.emit('update_sensors', {bool: smartMode, id: '9'})
            })
        }
    }, [smartMode]);

    return (
            connected ?
                <div className = 'simplecontoller'>
                    <div className='simplecontoller-sensorField'>
                        <SensorCard 
                            title='Vlhkosť'
                            value={humidity}
                            unit="%"
                            hint='Najpríjemnejšia vlhkosť vzduchu pre človeka je 50-60 %.'
                        />
                        <SensorCard 
                            title='Teplota'
                            value={temperature}
                            unit="°C"
                            hint='Najpríjemnejšia teplota v miestnosti pre človeka je 20-23 °C.'
                        />
                        
                    </div>
                    <div className='simplecontoller-controlField'>
                        <ControlCard title='Svetlo' icon_on={light_on} icon_off={light_off} power={mainLight} onClick={()=>setMainLight(!mainLight)} />
                        <ControlCard title='Klima' icon_on={clima_on} power={clima} disabled />
                        <ControlCard title='Dvere' icon_on={door_open} icon_off={door_close}  power={door} disabled />
                        <ControlCard title='Okno 1' icon_on={window_open} icon_off={window_close}  power={window1} onClick={()=>setWindow1(!window1)} />  
                        <ControlCard title='Okno 2' icon_on={window_open} icon_off={window_close}  power={window2} onClick={()=>setWindow2(!window2)} />
                        <ControlCard title='Rolety' >
                            <InputSlider min={0} max={10} value={potenciometerDataProcess(rpiData.potenciometer)} height='.8rem' width='18rem' />
                        </ControlCard>
                        <ControlCard title='Smart mode' icon_on={smart_mode_on} icon_off={smart_mode_off}  power={smartMode} onClick={()=>setSmartMode(!smartMode)}/>
                    </div>
                    <div className='simplecontoller-infoField'> 
                        <InfoCard title='Oheň' action={fire} />
                        <InfoCard title='Plyn' action={gas} />
                        <InfoCard title='Pohyb' action={motion} icon={motion_icon} />
                    </div>
                    <div className='simplecontoller-others'>
                        <SimpleCard title='Kamera' type='camera' api={api}/>
                        <SimpleCard title='Test senzorov' type='test' api={api} />
                    </div>
                    <ChatBox
                        icon={chat_icon}
                        data={rpiData}
                        actions={actions}
                        socket={socket}
                        api={api}
                        nodejsApi={nodejsApi}
                    />
                </div>
            :
            <>
                <div className = 'loader-message'>
                    <Loader />
                    <p>Prebieha pripojenie na server...</p>
                </div>
            </>
    )
}
