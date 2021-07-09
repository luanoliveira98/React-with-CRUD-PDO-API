import React from 'react';
import {Link} from 'react-router-dom';

import {Titulo, NavBar} from '../styles';

export const Home = () => {
  return (
    <div>
      <NavBar>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/pacientes">Pacientes</Link></div>
          <div><Link to="/consultas">Consultas</Link></div>
          <div><Link to="/especialidade">Especialidades</Link></div>
      </NavBar>
      <Titulo>Home</Titulo>
    </div>
  );
}
