import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { BsFillEyeFill, BsPencilSquare, BsFillPersonPlusFill, BsTrashFill } from 'react-icons/bs';

import configData from "../../../configs/app.json";
import {Table, Titulo, Container, ContentTitulo, ButtonAction, BtnSuccess, BtnPrimary, BtnWarning, BtnDanger, AlertSuccess, AlertDanger} from '../../styles';


export const PacientesList = () => {

  const [data, setData] = useState([]);

  const [title] = useState('Pacientes');
  const [url] = useState('pacientes');

  const [status,setStatus] = useState({
    type: '',
    message: ''
  });

  const destroy = async (id) => {

    await fetch(configData.API_URL+"/"+url+"/"+id, {
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
    getData();
  };

  const getData = async() => {
    fetch(configData.API_URL+"/"+url)
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.data)
    ));
  }

  useEffect(() => {
    getData();
  },[])
  return (
    <Container>
        <ContentTitulo>
            <Titulo>Listar {title}</Titulo>
            <ButtonAction>
                <Link to={"/"+url+"/cadastrar"}>
                    <BtnSuccess title="Cadastrar"><BsFillPersonPlusFill/></BtnSuccess>
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
            {Object.values(data).map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.nome}</td>
                <td>{d.email}</td>
                <td>{d.telefone}</td>
                <td>
                  <ContentTitulo>
                    <Link to={"/"+url+"/"+d.id}><BtnPrimary title="Visualizar"><BsFillEyeFill/></BtnPrimary></Link>
                    <Link to={"/"+url+"/"+d.id+"/editar"}><BtnWarning title="Editar"><BsPencilSquare/></BtnWarning></Link>
                    <BtnDanger onClick={() => destroy(d.id)} title="Excluir"><BsTrashFill/></BtnDanger>
                  </ContentTitulo>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
}
