import React, {useState, useEffect} from 'react';
import HomeDefaults from '../components/HomeDefaults/HomeDefaults';
import ChatBox from '../components/Chatbox/Chatbox';
import LastActionsTable from '../components/LastActionsTable/LastActionsTable';
import chat_icon from '../img/icons/chat.svg';
import socketIOClient from 'socket.io-client';
import _ from 'lodash';
import { ruleBaseSystemBehavior } from '../utils/expertalSystem';

import Loader from '../components/Loader/Loader';

export default function Home({ api, nodejsApi, user }) {
  const [rpiData, setRpiData] = useState({});
  const [actions, setActions] = useState({});
  const [tableData, setTableData] = useState([]);
  const [expertal, setExpertal] = useState({});
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(undefined);

    useEffect(() => {
        const socket = socketIOClient(api, {});
        setSocket(socket);
        socket.on('connect', data => {
          socket.emit('join', 'Server Connected to Client.');
          setConnected(true);
        });
        //socket.emit('expertal_system');
        socket.emit('update_sensors_grovepi_interval');

        socket.on('expertal_system', data => {
          console.log('EXPERTAL DATA', data)
          setExpertal(data);
        })
        socket.on('update_sensors', data=>{
          console.log('rip', data)
            setRpiData(data);
        })
        
        socket.on('update_actions', data=>{
          setActions(data);
        })
        socket.on('update_table_data', data=>{
          setTableData(data);
        })

        const interval2 = setInterval(() => {
          console.log('EXPERTAL SZSTEM START')
          socket !== null && socket.emit('expertal_system');
      }, 15000);

        const interval = setInterval(() => {
          socket.emit('update_sensors_grovepi_interval');
        }, 15000);

        return () => {
        clearInterval(interval);
        clearInterval(interval2);
        socket.disconnect()
      }
    }, []);

    useEffect(() => {
      actions.smart_mode && ruleBaseSystemBehavior(expertal, socket);
    }, [expertal]);

    return(
            <div className = 'home-bcg'>
              {
                connected ?
                  <>
                    <div className = 'home-main'>
                <p className='home-main-title'>Vitajte <b>{`${user.surname} ${user.lastname}`}</b></p>
                <p className='home-main-email'>{user.email}</p>
                <div className='home-main_defaults'>
                  <HomeDefaults data={rpiData} actions={actions} socket={socket} api={api} userID={user.id} />
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
              <div className="lastActionTable-center">
                <LastActionsTable data={tableData} />   
              </div>
            </div>
          <ChatBox
            icon={chat_icon}
            data={rpiData}
            actions={actions}
            socket={socket}
            api={api}
            nodejsApi={nodejsApi}
            userID={user.id}
          />
                  </>
                  :<div className = 'loader-message'>
                      <Loader />
                    <p>Prebieha pripojenie na server...</p>
              </div>
              }
              
          </div>
        
    )
}
