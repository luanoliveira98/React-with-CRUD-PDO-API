import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, Container, ContentTitulo, ButtonAction, BtnInfo, PLg} from '../../styles';

export const PacientesShow = (props) => {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState([]);

    const getPaciente = async() => {
        fetch(configData.API_URL+"/pacientes/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setData(responseJson.data)
        ));
    }

    useEffect(() => {
        getPaciente();
    })
    return (
        <Container>
            <ContentTitulo>
                <Titulo>{data.nome}</Titulo>
                <ButtonAction>
                    <Link to="/pacientes">
                        <BtnInfo><FaThList/></BtnInfo>
                    </Link>
                </ButtonAction>
            </ContentTitulo>
            <PLg><b>Nº:</b> {data.id}</PLg>
            <PLg><b>Data de Nascimento:</b> {moment(data.dt_nascimento).format('DD/MM/yyyy')}</PLg>
            <PLg><b>Endereço:</b> {data.endereco}</PLg>
            <PLg><b>Telefone:</b> {data.telefone}</PLg>
            <PLg><b>Email:</b> {data.email}</PLg>
            <PLg><b>Cadastrado em:</b> {moment(data.dt_insercao).format('DD/MM/yyyy H:m:s')}</PLg>
            <PLg><b>Última alteração em:</b> {moment(data.dt_alteracao).format('DD/MM/yyyy H:m:s')}</PLg>
        </Container>
    );
}
