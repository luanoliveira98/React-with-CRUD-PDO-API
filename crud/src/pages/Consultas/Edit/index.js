/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaThList } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Titulo, AlertSuccess, AlertDanger, Container, Form, Label, Input, Select, ButtonWarning, ContentTitulo, ButtonAction, BtnInfo, NavBar} from '../../styles';

export const ConsultasEdit = (props) => {

    const [id] = useState(props.match.params.id);
    const [paciente_id,setPacienteId] = useState('');
    const [dt_agendamento,setDtAgendamento] = useState('');
    const [horario,setHorario] = useState('');
    const [especialidade_id,setEspecialidadeId] = useState('');
    const [status,setStatus] = useState('');

    const [title] = useState('Consulta');
    const [url] = useState('consultas');

    const [pacientes, setPacientes] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [statusHttp,setStatusHttp] = useState({
        type: '',
        message: ''
    });

    const getData = async() => {
        fetch(configData.API_URL+"/"+url+"/"+id)
        .then((response) => response.json())
        .then((responseJson) => (
            setPacienteId(responseJson.data.paciente_id),
            setDtAgendamento(responseJson.data.dt_agendamento),
            setHorario(responseJson.data.horario),
            setEspecialidadeId(responseJson.data.especialidade_id),
            setStatus(responseJson.data.status.toLowerCase())
        ));
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
        getData();
        getPacientes();
        getEspecialidades();
    },[id])

    const editData = async e => {
        e.preventDefault();

        await fetch(configData.API_URL+"/"+url+"/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({paciente_id, dt_agendamento, horario, especialidade_id, status})
        })
        .then((response)  => {
            if (response.status === 400) {
                response.json().then(responseJson => {
                    console.log(responseJson);
                    setStatusHttp({
                        type: 'error',
                        message: (!responseJson.data) ? responseJson.message : responseJson.data[0].message
                    })
                });
            } else {
                setStatusHttp({
                    type: 'success',
                    message: "Editado com sucesso!"
                })
            }
        })
        .catch(() => {
            setStatusHttp({
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
            {statusHttp.type === 'success' ? <AlertSuccess>{statusHttp.message}</AlertSuccess> : statusHttp.type === 'error' ? <AlertDanger>{statusHttp.message}</AlertDanger> : ""}
            <Form onSubmit={editData}>
                <div>
                    <Label>Paciente:</Label>
                    <Select name="paciente_id" onChange={e => setPacienteId(e.target.value)}>
                    {Object.values(pacientes).map(d => (
                        <option key={d.id} value={d.id} selected={paciente_id === d.id ? "selected" : ""}>{d.nome}</option>
                    ))}
                    </Select> <br/><br/>
                </div>
                <div>
                    <Label>Data da Consulta:</Label>
                    <Input type="date" name="dt_agendamento" onChange={e => setDtAgendamento(e.target.value)} value={dt_agendamento} /> <br/><br/>
                </div>
                <div>
                    <Label>Horário da Consulta:</Label>
                    <Input type="time" name="horario" onChange={e => setHorario(e.target.value)} value={horario} /> <br/><br/>
                </div>
                <div>
                    <Label>Especialidade:</Label>
                    <Select name="especialidade_id" onChange={e => setEspecialidadeId(e.target.value)}>
                    {Object.values(especialidades).map(d => (
                        <option key={d.id} value={d.id} selected={especialidade_id === d.id ? "selected" : ""}>{d.nome}</option>
                    ))}
                    </Select> <br/><br/>
                </div>
                <div>
                    <Label>Status:</Label>
                    <Select name="status" onChange={e => setStatus(e.target.value)}>
                        <option value='pendente' selected={status === 'pendente' ? "selected" : ""}>Pendente</option>
                        <option value='executado' selected={status === 'executado' ? "selected" : ""}>Executado</option>
                    </Select> <br/><br/>
                </div>

                <div>
                    <ButtonWarning type="submit">Editar</ButtonWarning>
                </div>
            </Form>
        </Container>
    </div>
  );
}
