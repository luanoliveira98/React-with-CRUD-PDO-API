/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, Container, ContentTitulo, ButtonAction, BtnInfo, PLg, NavBar} from '../../styles';

export const ConsultasShow = (props) => {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState([]);

    const [title] = useState('Consulta');
    const [url] = useState('consultas');

    const getData = async() => {
        fetch(configData.API_URL+"/"+url+"/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setData(responseJson.data)
        ));
    }

    useEffect(() => {
        getData();
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
                    <Titulo>Ficha de {title}</Titulo>
                    <ButtonAction>
                        <Link to={"/"+url}>
                            <BtnInfo title="Listar"><FaThList/></BtnInfo>
                        </Link>
                    </ButtonAction>
                </ContentTitulo>
                <PLg><b>Nº:</b> {data.id}</PLg>
                <PLg><b>Paciente:</b> {data.paciente}</PLg>
                <PLg><b>Data:</b> {moment(data.dt_agendamento).format('DD/MM/yyyy')}</PLg>
                <PLg><b>Horario:</b> {data.horario}</PLg>
                <PLg><b>Especialidade:</b> {data.especialidade}</PLg>
                <PLg><b>Status:</b> {data.status}</PLg>
                <PLg><b>Cadastrado em:</b> {moment(data.dt_insercao).format('DD/MM/yyyy H:m:s')}</PLg>
                <PLg><b>Última alteração em:</b> {moment(data.dt_alteracao).format('DD/MM/yyyy H:m:s')}</PLg>
            </Container>
        </div>
    );
}
