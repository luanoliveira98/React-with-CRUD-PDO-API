import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import configData from "../../../configs/app.json";
import {Table, Titulo, Container, ContentTitulo, ButtonAction, ButtonSuccess} from '../../styles';

export const PacientesList = () => {

  const [data, setData] = useState([]);

  const getPacientes = async() => {
    fetch(configData.API_URL+"/pacientes")
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.data)
    ));
  }

  useEffect(() => {
    getPacientes();
  },[])
  return (
    <Container>
        <ContentTitulo>
            <Titulo>Listar Pacientes</Titulo>
            <ButtonAction>
                <Link to="/pacientes/cadastrar">
                    <ButtonSuccess>Cadastrar</ButtonSuccess>
                </Link>
            </ButtonAction>
        </ContentTitulo>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.email}</td>
                <td>{paciente.telefone}</td>
                <td>
                  <a href={'/pacientes/'+paciente.id}>Visualizar</a> | <a href={'/pacientes/'+paciente.id+'/editar'}>Editar</a> | <a href={'/pacientes/'+paciente.id+'/excluir'}>Excluir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
}
