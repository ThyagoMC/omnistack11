import React, { useContext } from 'react';

import { store } from '../../store';
import { FiArrowLeft } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.scss';

export default function Register(){
  const  {state} = useContext(store);
  const dark = state.dark?" dark":"";

  return (
    <div className={"register-container" +dark}>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro entre na plataforma e ajude pessoas a encontrarem os casos da sua  ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
             Voltar
           </Link>
        </section>
        <form>
          <input type="text" placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="WhatsApp"/>
          <div className="input-group">
            <input type="text" placeholder="Cidade"/>
            <input type="text" placeholder="UF" style={{width: 80}}/>
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}