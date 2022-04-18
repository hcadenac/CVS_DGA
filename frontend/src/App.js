import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navegacion/NavBar';
import Footer from './components/Navegacion/Footer';
import ListaMunicipio from './components/Paginas/ListaMunicipio';
//import AddMunicipio from './components/Paginas/AddMunicipio';
import GestionMunicipio from './components/Paginas/GestionMunicipio';
import GestionEmpresa from './components/Paginas/GestionEmpresa';
import AddEmpresa from './components/Paginas/AddEmpresa';
import Login from './components/Paginas/Login';
import Inicio from './components/Paginas/Inicio';

function App() {
  return (
    <div className="App">
     <Router>
        <NavBar />
       
        <Routes>
          <Route path='/Inicio' element={<Inicio />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/AddEmpresa' element={<AddEmpresa />} />  
          <Route path='/GestionMunicipio' element={<GestionMunicipio />} />
          <Route path='/GestionEmpresa' element={<GestionEmpresa />} />
          <Route path='/ListaMunicipio' element={<ListaMunicipio />} />
          <Route path='/GestionEmpresa' element={<GestionEmpresa />} />
          {/* <Route path='/GestionSolicitudes' element={<GestionSolicitudes />} />*/}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;