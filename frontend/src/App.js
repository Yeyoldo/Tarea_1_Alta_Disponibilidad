import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Login from './components/login.js'
import Home from './components/home.js'
import Commit from './components/comentario.js'


export default function App(){
  return (
    <Router>
      <Route path="/" exact render={() => <Login />} />
      <Route path="/home" exact render={() => <Home />} />
      <Route path="/commit" exact render={() => <Commit />} />
    </Router>
  );
}
