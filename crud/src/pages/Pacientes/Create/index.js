import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, AlertSuccess, AlertDanger, Container, Form, Label, Input, InputRadio, ButtonSuccess, ContentTitulo, ButtonAction, BtnInfo, NavBar} from '../../styles';

export const PacientesCreate = () => {

    const [data,setData] = useState({
        nome: '',
        dt_nascimento: '',
        endereco: '',
        sexo: '',
        telefone: '',
        email: ''
    });

    const [title] = useState('Paciente');
    const [url] = useState('pacientes');

    const [status,setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setData({ ...data, [e.target.name]: e.target.value });

    const registerData = async e => {
        e.preventDefault();

        await fetch(configData.API_URL+"/"+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status === 'success') {
                setStatus({
                    type: responseJson.status,
                    message: responseJson.message
                })
            } else {
                setStatus({
                    type: responseJson.status,
                    message: responseJson.data[0].message
                })
            }
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
            <div><Link to="/especialidade">Especialidades</Link></div>
        </NavBar>
        <Container>
            <ContentTitulo>
                <Titulo>Cadastro de {title}</Titulo>
                <ButtonAction>
                    <Link to={"/"+url}>
                        <BtnInfo title="Listar"><FaThList/></BtnInfo>
                    </Link>
                </ButtonAction>
            </ContentTitulo>
            {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
            <Form onSubmit={registerData}>
                <div>
                    <Label>Nome Completo:</Label>
                    <Input type="text" name="nome" placeholder="Nome Completo" onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Data de Nascimento:</Label>
                    <Input type="date" name="dt_nascimento" onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Endereço:</Label>
                    <Input type="text" name="endereco" placeholder="Endereço com complemento"  onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Sexo:</Label><br></br>
                    <InputRadio type="radio" name="sexo" value="masculino" onChange={valorInput}/> Masculino
                    <InputRadio type="radio" name="sexo" value="feminino" onChange={valorInput}/> Feminino <br/><br/>
                </div>
                <div>
                    <Label>Telefone:</Label>
                    <Input type="number" name="telefone" placeholder="Telefone com DDD" onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Email:</Label>
                    <Input type="email" name="email" placeholder="Email para contato"  onChange={valorInput}/> <br/><br/>
                </div>

                <div>
                    <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
                </div>
            </Form>
        </Container>
    </div>
  );
}
