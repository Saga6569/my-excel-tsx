import './index.css'
import { useState } from "react";
import Imput from './Component/Imput';
import Table from './Component/Table';
import ContextMenu from './Component/ContextMenu';
import {UserContext} from './Context/Context'

export const App = () => {
  const [state, setState] = useState({tableSize: {}, table: [], coordinates: {}});
  return (
    <UserContext.Provider value = {{state, setState}}>
      <div onClick={() => setState({...state, coordinates: {}})} >
        <Imput />
        <Table />
        <ContextMenu />
      </div>
    </UserContext.Provider>
  );
};

export default App;
