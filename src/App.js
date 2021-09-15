import './App.css';
// import { Roterizador } from './components/Roterizador';
// import { Reenvio } from './components/reenvioRota';
import Routes from "./components/Routes";


import Modal from 'react-modal';

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
    // <div>
    //   {/* <Roterizador /> */}
    //   <Reenvio/>
    // </div>
    <Routes/>
  );
}


export default App;
