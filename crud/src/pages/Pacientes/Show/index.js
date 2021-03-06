/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { FaThList, FaCheck } from 'react-icons/fa';
import { BsFillEyeFill, BsPencilSquare, BsTrashFill } from 'react-icons/bs';

import configData from "../../../configs/app.json";
import {Titulo, Container, ContentTitulo, ButtonAction, BtnInfo, PLg, Table, BtnSuccess, TextCenter, AlertSuccess, AlertDanger, NavBar, BtnPrimary, BtnWarning, BtnDanger} from '../../styles';

export const PacientesShow = (props) => {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState([]);
    const [consultas, setConsultas] = useState([]);

    const [title] = useState('Paciente');
    const [url] = useState('pacientes');

    const [status,setStatus] = useState({
      type: '',
      message: ''
    });

    const getData = async() => {
        fetch(configData.API_URL+"/"+url+"/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setData(responseJson.data)
        ));
    }
  
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
    fetch(configData.API_URL+"/consultas/paciente/"+id)
    .then((response) => response.json())
    .then((responseJson) => (
      setConsultas(responseJson.data)
    ));
  }

    useEffect(() => {
        getData();
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
                    <Titulo>Ficha de {title} - {data.nome}</Titulo>
                    <ButtonAction>
                        <Link to={"/"+url}>
                            <BtnInfo title="Listar"><FaThList/></BtnInfo>
                        </Link>
                    </ButtonAction>
                </ContentTitulo>
                <PLg><b>Nº:</b> {data.id}</PLg>
                <PLg><b>Nome:</b> {data.nome}</PLg>
                <PLg><b>Data de Nascimento:</b> {moment(data.dt_nascimento).format('DD/MM/yyyy')}</PLg>
                <PLg><b>Sexo:</b> {data.sexo}</PLg>
                <PLg><b>Endereço:</b> {data.endereco}</PLg>
                <PLg><b>Telefone:</b> {data.telefone}</PLg>
                <PLg><b>Email:</b> {data.email}</PLg>
                <PLg><b>Cadastrado em:</b> {moment(data.dt_insercao).format('DD/MM/yyyy H:m:s')}</PLg>
                <PLg><b>Última alteração em:</b> {moment(data.dt_alteracao).format('DD/MM/yyyy H:m:s')}</PLg>
                <TextCenter>
                    <Titulo>Consultas</Titulo>
                </TextCenter>
                {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
                <Table>
                    <thead>
                        <tr>
                        <th>Nº</th>
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
