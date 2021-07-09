import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, AlertSuccess, AlertDanger, Container, Form, Label, Input, Select, ButtonSuccess, ContentTitulo, ButtonAction, BtnInfo, NavBar} from '../../styles';

export const ConsultasCreate = () => {

    const [data,setData] = useState({
        paciente_id: '',
        dt_agendamento: '',
        horario: '',
        especialidade_id: ''
    });

    const [title] = useState('Consulta');
    const [url] = useState('consultas');

    const [pacientes, setPacientes] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

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

    const getPacientes = async() => {
        fetch(configData.API_URL+"/pacientes")
        .then((response) => response.json())
        .then((responseJson) => (
        setPacientes(responseJson.data)
        ));
    }

    const getEspecialidades = async() => {
        fetch(configData.API_URL+"/especialidades")
        .then((response) => response.json())
        .then((responseJson) => (
        setEspecialidades(responseJson.data)
        ));
    }

    useEffect(() => {
        getPacientes();
        getEspecialidades();
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
                    <Label>Paciente:</Label>
                    <Select name="paciente_id" onChange={valorInput}>
                    {Object.values(pacientes).map(d => (
                        <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                    </Select> <br/><br/>
                </div>
                <div>
                    <Label>Data da Consulta:</Label>
                    <Input type="date" name="dt_agendamento" onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Horário da Consulta:</Label>
                    <Input type="time" name="horario" onChange={valorInput}/> <br/><br/>
                </div>
                <div>
                    <Label>Especialidade:</Label>
                    <Select name="especialidade_id" onChange={valorInput}>
                    {Object.values(especialidades).map(d => (
                        <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                    </Select> <br/><br/>
                </div>

                <div>
                    <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
                </div>
            </Form>
        </Container>
    </div>
  );
}
