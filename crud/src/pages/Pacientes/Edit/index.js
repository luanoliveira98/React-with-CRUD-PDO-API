/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, AlertSuccess, AlertDanger, Container, Form, Label, Input, InputRadio, ButtonWarning, ContentTitulo, ButtonAction, BtnInfo} from '../../styles';

export const PacientesEdit = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome,setNome] = useState('');
    const [dt_nascimento,setDtNascimento] = useState('');
    const [endereco,setEndereco] = useState('');
    const [sexo,setSexo] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState('');

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
            setNome(responseJson.data.nome),
            setDtNascimento(responseJson.data.dt_nascimento),
            setEndereco(responseJson.data.endereco),
            setSexo(responseJson.data.sexo.toLowerCase()),
            setTelefone(responseJson.data.telefone),
            setEmail(responseJson.data.email)
        ));
    }

    useEffect(() => {
        getData();
    },[id])

    const editData = async e => {
        e.preventDefault();
        console.log(sexo);

        await fetch(configData.API_URL+"/"+url+"/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, dt_nascimento, endereco, sexo, telefone, email})
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
    <Container>
        <ContentTitulo>
            <Titulo>Editar {title}</Titulo>
            <ButtonAction>
                <Link to={"/"+url}>
                    <BtnInfo><FaThList/></BtnInfo>
                </Link>
            </ButtonAction>
        </ContentTitulo>
        {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
        <Form onSubmit={editData}>
            <div>
                <Label>Nome Completo:</Label>
                <Input type="text" name="nome" placeholder="Nome Completo" onChange={e => setNome(e.target.value)} value={nome} /> <br/><br/>
            </div>
            <div>
                <Label>Data de Nascimento:</Label>
                <Input type="date" name="dt_nascimento" onChange={e => setDtNascimento(e.target.value)} value={dt_nascimento} /> <br/><br/>
            </div>
            <div>
                <Label>Endereço:</Label>
                <Input type="text" name="endereco" placeholder="Endereço com complemento" onChange={e => setEndereco(e.target.value)} value={endereco} /> <br/><br/>
            </div>
            <div>
                <Label>Sexo:</Label><br></br>
                <InputRadio type="radio" name="sexo" value="masculino" onChange={e => setSexo(e.target.value)} checked={sexo === 'masculino' ? "checked" : ""} /> Masculino
                <InputRadio type="radio" name="sexo" value="feminino" onChange={e => setSexo(e.target.value)} checked={sexo === 'feminino' ? "checked" : ""} /> Feminino <br/><br/>
            </div>
            <div>
                <Label>Telefone:</Label>
                <Input type="number" name="telefone" placeholder="Telefone com DDD" onChange={e => setTelefone(e.target.value)} value={telefone} /> <br/><br/>
            </div>
            <div>
                <Label>Email:</Label>
                <Input type="email" name="email" placeholder="Email para contato" onChange={e => setEmail(e.target.value)}  value={email} /> <br/><br/>
            </div>

            <div>
                <ButtonWarning type="submit">Editar</ButtonWarning>
            </div>
        </Form>
    </Container>
  );
}
