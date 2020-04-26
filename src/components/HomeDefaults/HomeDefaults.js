import React, {useState, useEffect} from 'react';
import Loader from '../Loader/Loader';
import InputSlider from '../InputSlider/InputSlider';
import SlideButton from '../Button/SlideButton';
import { potenciometerDataProcess } from '../../utils/config';
import _ from 'lodash';
import { updateLastActionTable } from '../../utils/config';

export default function HomeDefaults({ data, socket, actions, api,  userID }) {
    console.log('TEST', actions)
    const [clima, setClima] = useState(_.get(data, 'switch_sensor', 0));
    const [window1, setWindow1] = useState(false);
    const [window2, setWindow2] = useState(false);
    const [smartMode, setSmartMode] =  useState(false);
    const [mainLight, setMainLight] = useState(false);

    useEffect(() => {
        Object.keys(data).map(key=>{
            if (key === 'switch_sensor') setClima(data[key])
        })
    }, [data]);
    useEffect(() => {
        setWindow1(actions.window1);
        setWindow2(actions.window2);
        setMainLight(actions.main_light);
        setSmartMode(actions.smart_mode);
    }, [actions]);
   
    const window1Handler = () => {
        setWindow1(!window1);
        updateLastActionTable(api, userID, `${!window1 ? 'Otvorenie' : 'Zatvorenie'} okna č. 1`, new Date(), () =>{
            socket.emit('update_sensors', {bool: !window1, id: '4'})
        });
    }
    const window2Handler = () => {
        setWindow2(!window2);
        updateLastActionTable(api, userID, `${!window2 ? 'Otvorenie' : 'Zatvorenie'} okna č. 2`, new Date(), ()=>{
            socket.emit('update_sensors', {bool: !window2, id: '5'});
        })
    }
    const lightHandler = () => {
        setMainLight(!mainLight);
        updateLastActionTable(api, userID, `${!mainLight ? 'Zapnutie' : 'Vypnutie'} svetla`, new Date(), ()=>{
            socket.emit('update_sensor_lights', {bool: !mainLight});
        })
    }
    const smartModeHandler = () => {
        setSmartMode(!smartMode);
        updateLastActionTable(api, userID, `${!smartMode ? 'Zapnutie' : 'Vypnutie'} smart-modu`, new Date(), ()=>{
            socket.emit('update_sensors', {bool: smartMode, id: '9'});
        })
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
                            <SlideButton buttonON={window1} onClick={window1Handler} />
                        </li>
                        <li>
                            <p>Okno 2</p>
                            <SlideButton buttonON={window2} onClick={window2Handler} />
                        </li>
                        <li>
                            <p>Hlavne svetlo</p>
                            <SlideButton buttonON={mainLight} onClick={lightHandler} />
                        </li>
                        <li>
                            <p>Rolety</p>
                            <InputSlider min={0} max={10} value={potenciometerDataProcess(data.potenciometer)} height='1.3rem' width='25rem'/>
                        </li>
                        <li>
                            <p>Smart mode</p>
                            <SlideButton buttonON={smartMode} onClick={smartModeHandler}/>
                        </li>
                    </>
            }
        </ul>
    )
}
