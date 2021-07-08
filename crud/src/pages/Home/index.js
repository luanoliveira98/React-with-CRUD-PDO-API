import React, { useState, useEffect } from 'react';

import {Table, Titulo} from './styles';

export const Home = () => {

  const [data, setData] = useState([]);

  const getPacientes = async() => {
    fetch("http://localhost/CRUD-PDO/pacientes")
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.data)
    ));
  }

  useEffect(() => {
    getPacientes();
  },[])
  return (
    <div>
      <Titulo>Listar Pacientes</Titulo>
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
    </div>
  );
}
