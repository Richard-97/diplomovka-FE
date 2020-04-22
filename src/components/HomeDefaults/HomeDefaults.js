import React, {useState, useEffect} from 'react';
import Loader from '../Loader/Loader';
import InputSlider from '../InputSlider/InputSlider';
import SlideButton from '../Button/SlideButton';
import Button from '../Button/Button';
import _ from 'lodash';



export default function HomeDefaults({ data, socket, actions }) {
    console.log('TEST', actions)
    const [clima, setClima] = useState(_.get(data, 'switch_sensor', 0));
    const [window1, setWindow1] = useState(_.get(actions, 'window1', false));
    const [window2, setWindow2] = useState(_.get(actions, 'window2', false));
    const [smartMode, setSmartMode] =  useState(_.get(actions, 'smart_mode', false));
    const [mainLight, setMainLight] = useState(_.get(actions, 'lights', false));

    useEffect(() => {
        Object.keys(data).map(key=>{
            if (key === 'switch_sensor') setClima(data[key])
        })
    }, [data]);
    
    useEffect(() => {
        Object.keys(actions).map(key=>{
            if (key === 'smart_mode') setSmartMode(actions[key])
        })
    }, [actions]);

    useEffect(()=>{
        socket !== null &&
            socket.emit('update_sensors', {bool: window1, id: '4'})
    }, [window1])

    useEffect(()=>{
        socket !== null &&
            socket.emit('update_sensors', {bool: window2, id: '5'})
    }, [window2])

    useEffect(() => {
        socket !== null &&
            socket.emit('update_sensors', {bool: smartMode, id: '9'})
    }, [smartMode]);

    useEffect(()=>{
        if(socket !== null){
            socket.emit('update_sensor_lights', {bool: mainLight})
        }
    }, [mainLight])
    const potenciometerDataProcess = potenciometerData => {
        if(_.isNil(potenciometerData)) return 0;
        if(potenciometerData >= 1000){
            return 10;
        }
        console.log('NUMBER', parseInt(potenciometerData.toString().substring(0, 1)))
        return parseInt(potenciometerData.toString().substring(0, 1));
    }
    return (
        <ul className='home-main_defaults-infos'>
            {
                Array.isArray(data)
                    ? <Loader />
                    :<>
                        <li>
                            <p>Klima</p>
                            <SlideButton buttonON={clima == 1} onClick={()=>setClima(!clima)} disabled/>
                        </li>
                        <li>
                            <p>Okno 1</p>
                            <SlideButton buttonON={actions.window1} onClick={()=>setWindow1(!window1)} />
                        </li>
                        <li>
                            <p>Okno 2</p>
                            {console.log('windows', window2)}
                            <SlideButton buttonON={actions.window2} onClick={()=>setWindow2(!window2)} />
                        </li>
                        <li>
                            <p>Hlavne svetlo</p>
                            <SlideButton buttonON={actions.lights} onClick={()=>setMainLight(!mainLight)} />
                        </li>
                        <li>
                            <p>Rolety</p>
                            <InputSlider min={0} max={10} value={potenciometerDataProcess(data.potenciometer)} height='1.3rem' width='25rem'/>
                        </li>
                        <li>
                            <p>Smart mode</p>
                            <SlideButton buttonON={smartMode} onClick={()=>setSmartMode(!smartMode)}/>
                        </li>
                    </>
            }
        </ul>
    )
}
