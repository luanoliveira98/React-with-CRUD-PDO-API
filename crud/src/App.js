import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home';

import {PacientesList} from './pages/Pacientes/List';
import {PacientesCreate} from './pages/Pacientes/Create';
import {PacientesShow} from './pages/Pacientes/Show';
import {PacientesEdit} from './pages/Pacientes/Edit';

import {EspecialidadesList} from './pages/Especialidades/List';
import {EspecialidadesCreate} from './pages/Especialidades/Create';
import {EspecialidadesEdit} from './pages/Especialidades/Edit';

import {ConsultasList} from './pages/Consultas/List';
import {ConsultasCreate} from './pages/Consultas/Create';
import {ConsultasShow} from './pages/Consultas/Show';
import {ConsultasEdit} from './pages/Consultas/Edit';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route exact path="/pacientes" component={PacientesList}/>
          <Route path="/pacientes/cadastrar" component={PacientesCreate}/>
          <Route exact path="/pacientes/:id" component={PacientesShow}/>
          <Route exact path="/pacientes/:id/editar" component={PacientesEdit}/>

          <Route exact path="/especialidades" component={EspecialidadesList}/>
          <Route path="/especialidades/cadastrar" component={EspecialidadesCreate}/>
          <Route path="/especialidades/:id/editar" component={EspecialidadesEdit}/>
          
          <Route exact path="/consultas" component={ConsultasList}/>
          <Route path="/consultas/cadastrar" component={ConsultasCreate}/>
          <Route exact path="/consultas/:id" component={ConsultasShow}/>
          <Route path="/consultas/:id/editar" component={ConsultasEdit}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
