import './App.css';
import { Roterizador } from './components/Roterizador';
import { RoterizadorTESTE } from './components/RoterizadorTESTE';


import Modal from 'react-modal';

import React, { useState } from 'react';

// import { RowSelection } from './components/RowselectionTable';
// import { FilteringTable } from './components/FilteringTable';
// import { PaginationTable } from './components/PaginationTable';
// import { BasicTable } from './components/BasicTable';
// import { SortingTable } from './components/SortingTable';
Modal.setAppElement('#root');
function App() {

  return (
    // <div className="App">
    //   <RowSelection />
    // </div>
    <div>

      <Roterizador />
    </div>
  );
}


export default App;
