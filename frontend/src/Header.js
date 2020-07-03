import React, { useContext } from 'react';
import { FiSun } from 'react-icons/fi';

import { store } from './store';

function Header( { children }){
    const {state, dispatch} = useContext(store);

    return (
        <div className={"iconPos" + (state.dark? " dark":"")} onClick={()=>dispatch({ type: 'swap_color' })} >
                <FiSun size={40} color={ state.dark? "rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)"} />
        </div>
    );
}

export default Header;