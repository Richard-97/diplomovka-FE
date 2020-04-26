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
                        <Link to='/domov' replace>Domov</Link>
                    </li>
                    <li>
                        <Link to='/modelpriestoru'>Model priestoru</Link>
                    </li>
                    <li>
                        <Link to='/jednoducheovladanie'>Jednoduche ovladanie</Link>
                    </li>
                    <li>
                        <Link to='/profil'>Profil</Link>
                    </li>
                    <li>
                        <Link to='/nastavenia'>Nastavenia</Link>
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