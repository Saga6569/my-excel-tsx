import './index.css'
import { useState, useMemo } from "react";
import Imput from './Component/Imput';
import Table from './Component/Table';
import ContextMenu from './Component/ContextMenu';
import {UserContext} from './Context/Context'

export const Application = () => {

  const [tableSize, setTableSize] = useState({});
  const tableSizeСhange = useMemo(() => ({ tableSize, setTableSize }), [tableSize]);

  const [table, setTable] = useState([]);
  const tableСhange = useMemo(() => ({ table, setTable }), [table]);

  const [coordinates, setCoordinates] = useState({});
  const coordinatesСhange = useMemo(() => ({ coordinates, setCoordinates }), [coordinates]);

  return (
    <div onClick={() => setCoordinates({})}>
    <UserContext.Provider value={{ tableSizeСhange, tableСhange, coordinatesСhange}}>
      <Imput />
      <Table />
      <ContextMenu />
    </UserContext.Provider>
    </div>
  );
};

export default Application;





