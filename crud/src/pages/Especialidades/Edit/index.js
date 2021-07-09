/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, AlertSuccess, AlertDanger, Container, Form, Label, Input, ButtonWarning, ContentTitulo, ButtonAction, BtnInfo, NavBar} from '../../styles';

export const EspecialidadesEdit = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome,setNome] = useState('');

    const [title] = useState('Especialidade');
    const [url] = useState('especialidades');

    const [status,setStatus] = useState({
        type: '',
        message: ''
    });

    const getData = async() => {
        fetch(configData.API_URL+"/"+url+"/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setNome(responseJson.data.nome)
        ));
    }

    useEffect(() => {
        getData();
    },[id])

    const editData = async e => {
        e.preventDefault();

        await fetch(configData.API_URL+"/"+url+"/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome})
        })
        .then(()  => {
            setStatus({
                type: 'success',
                message: "Editado com sucesso!"
            })
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro ao conectar com o servidor!'
            })
        })
    }

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
                <Titulo>Editar {title}</Titulo>
                <ButtonAction>
                    <Link to={"/"+url}>
                        <BtnInfo title="Listar"><FaThList/></BtnInfo>
                    </Link>
                </ButtonAction>
            </ContentTitulo>
            {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
            <Form onSubmit={editData}>
                <div>
                    <Label>Nome:</Label>
                    <Input type="text" name="nome" placeholder="Nome" onChange={e => setNome(e.target.value)} value={nome} /> <br/><br/>
                </div>

                <div>
                    <ButtonWarning type="submit">Editar</ButtonWarning>
                </div>
            </Form>
        </Container>
    </div>
  );
}
