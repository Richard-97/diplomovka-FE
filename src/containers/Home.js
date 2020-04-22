import React, {useState, useEffect} from 'react';
import HomeDefaults from '../components/HomeDefaults/HomeDefaults';
import ChatBox from '../components/Chatbox/Chatbox';
import LastActionsTable from '../components/LastActionsTable/LastActionsTable';
import chat_icon from '../img/icons/chat.svg';
import socketIOClient from 'socket.io-client';
import { FLASK_URL } from '../utils/config';
import { ruleBaseSystemBehavior } from '../utils/expertalSystem';

import UserContext from '../Context';
import Loader from '../components/Loader/Loader';

export default function Home() {

  const [rpiData, setRpiData] = useState({});
  const [actions, setActions] = useState({});
  const [expertal, setExpertal] = useState({});
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(undefined);

    useEffect(() => {
        const socket = socketIOClient(FLASK_URL, {});
        setSocket(socket);
        socket.on('connect', data => {
          socket.emit('join', 'Server Connected to Client.');
          setConnected(true);
        });
        socket.emit('expertal_system');
        socket.emit('update_sensors_grovepi_interval');
        socket.emit('update_sensors_start');

        socket.on('expertal_system', data => {
          console.log('Expertny', data)
          setExpertal(data);
        })
        socket.on('update_sensors', data=>{
          console.log('RPI', data)
            setRpiData(data);
        })
        socket.on('update_actions', data=>{
          setActions(data);
      })

        const interval2 = setInterval(() => {
          socket.emit('update_sensors_grovepi_interval');
        }, 15000);

        const interval = setInterval(() => {
            socket.emit('expertal_system');
        }, 15000);
        return () => {
        clearInterval(interval);
        clearInterval(interval2);
      }
    }, []);

    useEffect(() => {
      ruleBaseSystemBehavior(expertal, socket);
    }, [expertal]);

    return (
      <UserContext.Consumer>
        {
          ({firstName, lastName, email}) => (
            <div className = 'home-bcg'>
              <div className = 'home-main'>
                <p className='home-main-title'>Vitajte <b>{`${firstName} ${lastName}`}</b></p>
                <p className='home-main-email'>{email}</p>
                <div className='home-main_defaults'>
                  <HomeDefaults data={rpiData} actions={actions} socket={socket} />
                  <div className='home-main_defaults-infos2'>
                    <div className='home-main_defaults-infos2__tempHum'>
                      {
                        Array.isArray(rpiData)
                          ? <Loader />
                          : <>
                            <p>{rpiData.temperature}</p>
                            <p className='home-main_defaults-infos2_p'>°C</p>
                          </>
                      }
                    </div>
                    <div className='home-main_defaults-infos2__tempHum'>
                      {
                        Array.isArray(rpiData)
                          ? <Loader />
                          : <>
                            <p>{rpiData.humidity}</p>
                            <p className='home-main_defaults-infos2_p'>%</p>
                          </>
                      }
                    </div>
                  </div>
              </div>
              <LastActionsTable />   
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
      </UserContext.Consumer>
    )
}
