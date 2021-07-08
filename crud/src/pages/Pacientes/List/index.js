import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { BsFillEyeFill, BsPencilSquare, BsFillPersonPlusFill, BsTrashFill } from 'react-icons/bs';

import configData from "../../../configs/app.json";
import {Table, Titulo, Container, ContentTitulo, ButtonAction, BtnSuccess, BtnPrimary, BtnWarning, BtnDanger, AlertSuccess, AlertDanger} from '../../styles';


export const PacientesList = () => {

  const [data, setData] = useState([]);

  const [status,setStatus] = useState({
    type: '',
    message: ''
});

  const destroy = async (id) => {

    await fetch(configData.API_URL+"/pacientes/"+id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(()  => {
        setStatus({
            type: 'success',
            message: "Excluído com sucesso!"
        })
    })
    .catch(() => {
        setStatus({
            type: 'error',
            message: 'Erro ao conectar com o servidor!'
        })
    })
    getPacientes();
  };

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
                    <BtnSuccess><BsFillPersonPlusFill/></BtnSuccess>
                </Link>
            </ButtonAction>
        </ContentTitulo>
        {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
        <Table>
          <thead>
            <tr>
              <th>Nº</th>
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
                  <ContentTitulo>
                    <Link to={"/pacientes/"+paciente.id}><BtnPrimary><BsFillEyeFill/></BtnPrimary></Link>
                    <Link to={"/pacientes/"+paciente.id+"/editar"}><BtnWarning><BsPencilSquare/></BtnWarning></Link>
                    <BtnDanger onClick={() => destroy(paciente.id)}><BsTrashFill/></BtnDanger>
                  </ContentTitulo>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
}
