import './index.css'
import {useState } from "react";
import Input from './Component/Input';
import Table from './Component/Table';
import ContextMenu from './Component/ContextMenu';
import {UserContext} from './Context/Context'


export const App = () => {
  const [state, setState] = useState({tableSize: {height: 0, width: 0,}, table: [], coordinates: { left: 0, top: 0, el: {}}});
  return (
    <UserContext.Provider value = {{state, setState}}>
      <div onClick={() => Object.keys(state.coordinates).length === 0 ? null : setState({...state, coordinates: {top: 0, left: 0, el: {}}})}>
        <Input />
        <Table />
        <ContextMenu />
      </div>
    </UserContext.Provider>
  );
};

export default App;
