/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { FaLaptopMedical } from 'react-icons/fa';

import configData from "../../../configs/app.json";
import {Table, Titulo, Container, ContentTitulo, ContentActionSolo, ButtonAction, BtnSuccess, BtnWarning, BtnDanger, AlertSuccess, AlertDanger, NavBar} from '../../styles';


export const EspecialidadesList = () => {

  const [data, setData] = useState([]);

  const [title] = useState('Especialidades');
  const [url] = useState('especialidades');

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
    <div>
      <NavBar>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/pacientes">Pacientes</Link></div>
          <div><Link to="/consultas">Consultas</Link></div>
          <div><Link to="/especialidades">Especialidades</Link></div>
      </NavBar>
      <Container>
          <ContentTitulo>
              <Titulo>Listar {title}</Titulo>
              <ButtonAction>
                  <Link to={"/"+url+"/cadastrar"}>
                      <BtnSuccess title="Cadastrar Especialidade"><FaLaptopMedical/></BtnSuccess>
                  </Link>
              </ButtonAction>
          </ContentTitulo>
          {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess> : status.type === 'error' ? <AlertDanger>{status.message}</AlertDanger> : ""}
          <Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.nome}</td>
                  <td>
                    <ContentActionSolo>
                      <Link to={"/"+url+"/"+d.id+"/editar"}><BtnWarning title="Editar"><BsPencilSquare/></BtnWarning></Link>{" "}
                      <BtnDanger onClick={() => destroy(d.id)} title="Excluir"><BsTrashFill/></BtnDanger>
                    </ContentActionSolo>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </div>
  );
}
