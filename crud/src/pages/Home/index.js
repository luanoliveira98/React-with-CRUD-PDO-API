import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { BsFillEyeFill, BsPencilSquare, BsTrashFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { FaNotesMedical, FaLaptopMedical, FaCheck } from 'react-icons/fa';
import configData from "../../configs/app.json";

import {Titulo, NavBar, Container, ContentTitulo, ButtonAction, BtnSuccess, TextCenter, Table, AlertSuccess, AlertDanger, BtnPrimary, BtnWarning, BtnDanger} from '../styles';

export const Home = () => {

  const [consultas, setConsultas] = useState([]);

  const [status,setStatus] = useState({
    type: '',
    message: ''
  });
  
  const destroy = async (id) => {

    await fetch(configData.API_URL+"/consultas/"+id, {
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
        getConsultas();
    })
    .catch(() => {
        setStatus({
            type: 'error',
            message: 'Erro ao conectar com o servidor!'
        })
    })
  };

  const execute = async (id) => {

    await fetch(configData.API_URL+"/consultas/"+id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(()  => {
        getConsultas();
    })
    .catch(() => {
        setStatus({
            type: 'error',
            message: 'Erro ao conectar com o servidor!'
        })
    })
  };

  const getConsultas = async() => {
    fetch(configData.API_URL+"/consultas/agendadas/hoje")
    .then((response) => response.json())
    .then((responseJson) => (
      setConsultas(responseJson.data)
    ));
  }

    useEffect(() => {
        getConsultas();
    }, [])

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
              <Titulo>Página Inicial</Titulo>
              <ContentTitulo>
                <ButtonAction>
                    <Link to={"/pacientes/cadastrar"}>
                        <BtnSuccess title="Cadastrar Paciente"><BsFillPersonPlusFill/></BtnSuccess>
                    </Link>
                </ButtonAction>
                <ButtonAction>
                    <Link to={"/consultas/cadastrar"}>
                        <BtnSuccess title="Agendar Consulta"><FaNotesMedical/></BtnSuccess>
                    </Link>
                </ButtonAction>
                <ButtonAction>
                    <Link to={"/especialidades/cadastrar"}>
                      <BtnSuccess title="Cadastrar Especialidade"><FaLaptopMedical/></BtnSuccess>
                    </Link>
                </ButtonAction>
              </ContentTitulo>
          </ContentTitulo>
          <TextCenter>
              <Titulo>Cronograma Diário</Titulo>
          </TextCenter>
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
                  {Object.values(consultas).map(d => (
                  <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.paciente}</td>
                      <td>{moment(d.dt_agendamento).format('DD/MM/yyyy')}</td>
                      <td>{d.horario}</td>
                      <td>{d.especialidade}</td>
                      <td>{d.status}</td>
                      <td>
                      <ContentTitulo>
                        <Link to={"/consultas/"+d.id}><BtnPrimary title="Visualizar"><BsFillEyeFill/></BtnPrimary></Link>
                        <Link to={"/consultas/"+d.id+"/editar"}><BtnWarning title="Editar"><BsPencilSquare/></BtnWarning></Link>
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
