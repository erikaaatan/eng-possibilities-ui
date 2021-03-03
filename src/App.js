import { Container } from "react-bootstrap";
import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import ForecasterHome from './pages/Forecaster'

import "./App.css";

function App() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked)
  }

  return (
    <div>
      <Container fluid className="App">
        <NavBar handleToggle={handleToggle}/>
        <Container fluid>
         <ForecasterHome checked={checked}/>
        </Container>
      </Container>
    </div>
  );
}

export default App;
