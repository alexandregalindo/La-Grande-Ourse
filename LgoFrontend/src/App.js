// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Userlist from './components/Userlist';
import DepartmentList from './components/DepartmentList';
import Revenu from './components/Revenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <PrivateRoute path="/DepartmentList" exact component={DepartmentList} />
        <PrivateRoute path="/Revenu" exact component={Revenu} />
        <PrivateRoute path="/Layout" exact component={Layout} />
        <PrivateRoute path="/Userlist" exact component={Userlist} />
      </Switch>
    </Router>
  );
}

export default App;
