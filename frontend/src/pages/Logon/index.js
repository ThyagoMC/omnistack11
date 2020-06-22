import React, { useContext} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.scss';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import { store } from '../../store';

export default function Logon(){
  const  {state} = useContext(store);
  const dark = state.dark?" dark":"";
  return (
     <div className={"logon-container"}>
       <div className="content">
        <section className={"form"}>
          <img src={logoImg} alt="Be The Hero"/>
          <form faction="">
            <h1>Faça seu Logon</h1>

            <input type="text" placeholder="Sua Id"/>
            <button className="button" type="submit">Entrar</button>
            
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>
        <img src={heroesImg} alt="Heroes"/>
       </div>
     </div>
  );
}