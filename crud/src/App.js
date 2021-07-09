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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
