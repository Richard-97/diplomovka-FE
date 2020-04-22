import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import SensorCard from '../components/SensorCard/SensoreCard';
import ControlCard from '../components/ControlCard/ControlCard';
import SimpleCard from '../components/SimpleCard/SimpleCard';
import InfoCard from '../components/InfoCard/InfoCard';
import ChatBox from '../components/Chatbox/Chatbox';

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

import { FLASK_URL } from '../utils/config';

export default function SimpleController({ userID }) {

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
    const [blinds, setBlinds] = useState(5);
    const [gas, setGas] = useState(false);
    const [fire, setFire] = useState(false);
    const [smartMode, setSmartMode] = useState(false);

    useEffect(()=>{
        const socket = socketIOClient('http://localhost:5000', {});
        setSocket(socket);
        socket.on('connect', data => {
            socket.emit('join', 'Server Connected to Client.');
            setConnected(true);
        });
        if(connected){

        }
        const interval = setInterval(() => {
            socket.emit('update_sensors_grovepi_interval')
            console.log('update grovepi')
        }, 15000);

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
            })
        });
        return () => {
            clearInterval(interval);
        }
        }, []);

    useEffect(()=>{
        if(socket !== null){
            socket.emit('update_sensor_lights', {bool: mainLight})
        }
    }, [mainLight])
    useEffect(()=>{
        socket !== null &&
            socket.emit('update_sensors', {bool: clima, id: '2'})
    }, [clima])
    useEffect(()=>{
        socket !== null &&
            socket.emit('update_sensors', {bool: door, id: '3'})
    }, [door])
    useEffect(()=>{
        socket !== null &&
            socket.emit('update_sensors', {bool: window1, id: '4'})
    }, [window1])
    useEffect(()=>{
        if(socket !== null){
            socket.emit('update_sensors', {bool: window2, id: '5'})
            updateLastActionTable(userID, '1', 'test', new Date())
        }
    }, [window2])

    const updateLastActionTable = (userID, sensorID, action, time) => {
        fetch('http://localhost:5001/updateLastActionTable', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userID, sensorID, action, time
            })
        })
    }
    return (
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
                    <ControlCard title='Hlavné svetlo' icon_on={light_on} icon_off={light_off} power={mainLight} onClick={()=>setMainLight(!mainLight)} />
                    <ControlCard title='Klima' icon_on={clima_on} power={clima} onClick={()=>setClima(!clima)} />
                    <ControlCard title='Dvere' icon_on={door_open} icon_off={door_close}  power={door} onClick={()=>setDoor(!door)} />
                    <ControlCard title='Okno 1' icon_on={window_open} icon_off={window_close}  power={window1} onClick={()=>setWindow1(!window1)} />  
                    <ControlCard title='Okno 2' icon_on={window_open} icon_off={window_close}  power={window2} onClick={()=>setWindow2(!window2)} />
                    <ControlCard title='Rolety' >
                        <InputSlider min={0} max={10} value={blinds} height='.8rem' width='18rem' onLeft={()=>setBlinds(blinds-1)} onRight={()=>setBlinds(blinds+1)} />
                    </ControlCard>
                    <ControlCard title='Smart mode' icon_on={smart_mode_on} icon_off={smart_mode_off}  power={smartMode} onClick={()=>console.log('smart mode')}/>
                </div>
                <div className='simplecontoller-infoField'> 
                    <InfoCard title='Oheň' danger={fire} />
                    <InfoCard title='Plyn' danger={gas} />
                    <InfoCard title='Dážď' danger={false} />
                </div>
                <div className='simplecontoller-others'>
                    <SimpleCard title='Kamera' type='camera'/>
                    <SimpleCard title='Test senzorov' type='test' />
                </div>
                <ChatBox
                    icon={chat_icon}
                    data={rpiData}
                    actions={actions}
                    socket={socket}
                />
            </div>
    )
}
