import './App.css';
import { Roterizador } from './components/Roterizador';

import Modal from 'react-modal';

import React, {useState} from 'react';

// import { RowSelection } from './components/RowselectionTable';
// import { FilteringTable } from './components/FilteringTable';
// import { PaginationTable } from './components/PaginationTable';
// import { BasicTable } from './components/BasicTable';
// import { SortingTable } from './components/SortingTable';
Modal.setAppElement('#root');
function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    // <div className="App">
    //   <RowSelection />
    // </div>
    <div>
      <button onClick={()=> setModalIsOpen(true)}>Visualizar envio</button>
      <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=> setModalIsOpen(false)}>

    <button onClick={()=> setModalIsOpen(false)}>Fechar
    </button>
      </Modal>
      <Roterizador />
    </div>
  );
}


export default App;
