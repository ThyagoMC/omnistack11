import React,  {useEffect, useState} from 'react';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';

import './styles.scss';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile () {
  const [incidents, setIncidents] = useState([]); 

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(()=> {
    api.get('profile', {
      headers:{
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
      alert('Erro ao deletar incidente, tente novamente');
    }
  } 

  async function handleEditIncident(id){
    try{
      history.push(`/incidents/${id}`);
    }catch(err){
      alert('Erro ao deletar incidente, tente novamente');
    }
  } 

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
  <div className="profile-container">
    <header>
      <img src={logoImg} alt="Be the Hero"/>
      <span>Bem vinda, {ongName}</span>

      <Link className="button" to="/incidents/new">Cadastrar Novo Incidente</Link>
      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>
    </header>

    <h1>Casos cadastrados</h1>

    <ul>
      {incidents.map(incident=>(
        <li key={incident.id} k={incident.id}>
        <strong>CASO:</strong>
        <p>{incident.title}</p>

        <strong>DESCRIÇÃO:</strong>
        <p>{incident.description}</p>

        <strong>VALOR:</strong>
        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)} </p>

        <button className="btn-edit" type="button" onClick={()=>{ handleEditIncident(incident.id)}}>
          <FiEdit size={20} color="#A8A8B3" />
        </button>

        <button className="btn-remove"type="button" onClick={()=>{ handleDeleteIncident(incident.id)}}>
          <FiTrash2 size={20} color="#A8A8B3" />
        </button>
      </li>
      ))}      
    </ul>
  </div>
    );
}