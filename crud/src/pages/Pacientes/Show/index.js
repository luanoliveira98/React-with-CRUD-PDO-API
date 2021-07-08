import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, Container, ContentTitulo, ButtonAction, BtnInfo, PLg, Table, BtnWarning, ContentActionSolo, TextCenter} from '../../styles';

export const PacientesShow = (props) => {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState([]);
    const [consultas, setConsultas] = useState([]);

    const [title] = useState('Paciente');
    const [url] = useState('pacientes');

    const getData = async() => {
        fetch(configData.API_URL+"/"+url+"/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setData(responseJson.data)
        ));
    }

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
    })
    return (
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
                        <td>{d.especialidade_id}</td>
                        <td>{d.status}</td>
                        <td>
                        <ContentActionSolo>
                            <Link to={"/"+url+"/"+d.id+"/editar"}><BtnWarning title="Encerrar Consulta"><FaThList/></BtnWarning></Link>
                        </ContentActionSolo>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
