import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home';
import {PacientesList} from './pages/Pacientes/List';
import {PacientesCreate} from './pages/Pacientes/Create';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pacientes" component={PacientesList}/>
          <Route exact path="/pacientes/cadastrar" component={PacientesCreate}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
