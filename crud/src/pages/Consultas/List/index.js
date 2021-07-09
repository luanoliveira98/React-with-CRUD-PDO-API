/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { BsFillEyeFill, BsPencilSquare, BsFillPersonPlusFill, BsTrashFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Table, Titulo, Container, ContentTitulo, ButtonAction, BtnSuccess, BtnPrimary, BtnWarning, BtnDanger, AlertSuccess, AlertDanger, NavBar} from '../../styles';


export const ConsultasList = () => {

  const [data, setData] = useState([]);

  const [title] = useState('Consultas');
  const [url] = useState('consultas');

  const [status,setStatus] = useState({
    type: '',
    message: ''
  });

  const destroy = async (id) => {

    await fetch(configData.API_URL+"/"+url+"/"+id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(()  => {
        setStatus({
            type: 'success',
            message: "Excluído com sucesso!"
        })
    })
    .catch(() => {
        setStatus({
            type: 'error',
            message: 'Erro ao conectar com o servidor!'
        })
    })
    getData();
  };

  const execute = async (id) => {

    await fetch(configData.API_URL+"/consultas/"+id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(()  => {
        getData();
    })
    .catch(() => {
        setStatus({
            type: 'error',
            message: 'Erro ao conectar com o servidor!'
        })
    })
};

  const getData = async() => {
    fetch(configData.API_URL+"/"+url)
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.data)
    ));
  }

  useEffect(() => {
    getData();
  },[])
  return (
    <div>
      <NavBar>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/pacientes">Pacientes</Link></div>
          <div><Link to="/consultas">Consultas</Link></div>
          <div><Link to="/especialidades">Especialidades</Link></div>
      </NavBar>
      <Container>
          <ContentTitulo>
              <Titulo>Listar {title}</Titulo>
              <ButtonAction>
                  <Link to={"/"+url+"/cadastrar"}>
                      <BtnSuccess title="Cadastrar"><BsFillPersonPlusFill/></BtnSuccess>
                  </Link>
              </ButtonAction>
          </ContentTitulo>
          {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
          <Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Paciente</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Especialidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.paciente}</td>
                  <td>{moment(d.dt_agendamento).format('DD/MM/yyyy')}</td>
                  <td>{d.horario}</td>
                  <td>{d.especialidade}</td>
                  <td>{d.status}</td>
                  <td>
                    <ContentTitulo>
                      <Link to={"/"+url+"/"+d.id}><BtnPrimary title="Visualizar"><BsFillEyeFill/></BtnPrimary></Link>
                      <Link to={"/"+url+"/"+d.id+"/editar"}><BtnWarning title="Editar"><BsPencilSquare/></BtnWarning></Link>
                      {d.status === 'Pendente' ? <BtnSuccess title='Concluir Consulta' onClick={() => execute(d.id)}><FaCheck/></BtnSuccess> : ""}
                      <BtnDanger onClick={() => destroy(d.id)} title="Excluir"><BsTrashFill/></BtnDanger>
                    </ContentTitulo>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </div>
  );
}
