import React from 'react';
import './App.css';
import NavBar from './componentes/NavBar';
import ItemListContainer from './componentes/ItemListContainer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ItemListContainer greeting="Bienvenido a nuestra tienda!" />
      {/* Otros componentes o contenido */}
    </div>
  );
}

export default App;

