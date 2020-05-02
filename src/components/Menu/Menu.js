import React, {useState} from 'react';
import {Link} from 'react-router-dom'; 
import auth from '../../utils/auth';
import { withRouter } from 'react-router-dom';

function Menu({ clearAuth }) {
    const [active, setActive] = useState(false)

    return(
        <div className='menu-container'>
            <div className={active?'menu_btn_toggle active':'menu_btn_toggle'} onClick={()=>setActive(!active)}></div>
            <div className={active?'menu_overlay active':'menu_overlay'}></div>
            <div className={active?'menu_list active':'menu_list'}>
                <ul>
                    <li>
                        <Link to='/domov' replace onClick={()=>setActive(!active)}>Domov</Link>
                    </li>
                    <li>
                        <Link to='/modelpriestoru' onClick={()=>setActive(!active)}>Model priestoru</Link>
                    </li>
                    <li>
                        <Link to='/jednoducheovladanie' onClick={()=>setActive(!active)}>Jednoduche ovladanie</Link>
                    </li>
                    <li>
                        <Link to='/profil' onClick={()=>setActive(!active)}>Profil</Link>
                    </li>
                    <li>
                        <Link to='/' onClick={ clearAuth }>Odhlasiť</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu);