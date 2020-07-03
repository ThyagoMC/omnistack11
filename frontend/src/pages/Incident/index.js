import React, { useContext, useState, useEffect } from 'react';

import { store } from '../../store';
import { FiArrowLeft } from 'react-icons/fi';

import { Link, useHistory, useParams } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.scss';
import api from '../../services/api';

export default function Incident(){
  const { id } = useParams();
  const ongId = localStorage.getItem('ongId');

  const  {state} = useContext(store);
  const dark = state.dark?" dark":"";

  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();


  useEffect(()=>{
    if(id){
      api.get(`incidents/${id}`, {
        headers:{
          Authorization: ongId
        }
      }).then(response =>{
        if(response.data){
          setTitle(response.data.title);
          setDescription(response.data.description);
          setValue(response.data.value);
        }
      });
    }
  }, [id, ongId]);

  async function handleSaveIncident(e){
    e.preventDefault();
    
    try{
      let data = {
        title,
        description,
        value
      };
      if(!id){
        await api.post('incidents', data, {
          headers:{
            Authorization: ongId
          }
        });
      }else{
        data.id = id;
        await api.put(`incidents/${id}`, data, {
          headers:{
            Authorization: ongId
          }
        });
      }
      
      history.push('/profile');
    }catch(err){
      alert('Erro ao cadastrar incidente, tente novamente');
      console.log(err);
    }
  }

  return (
    <div className={"new-incident-container" +dark}>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>{id?"Salvar":"Cadastrar novo"} caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
             Voltar para home
           </Link>
        </section>
        <form onSubmit={e => handleSaveIncident(e)}>
          <input value={title} onChange={e =>setTitle(e.target.value)} placeholder="Título do caso" />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição" />
          <input value={value} onChange={e=>setValue(e.target.value)} placeholder="Valor em reais"/>
            
          <button className="button" type="submit">{id?"Salvar":"Cadastrar"}</button>
        </form>
      </div>
    </div>
  );
}