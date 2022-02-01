import  { createContext } from 'react';

export const UserContext = createContext({
  tableSize : {},
  setTableSize: () => {},
  table: [],
  setTable: () => {},
  coordinates : {},
  setCoordinates: () => {},
});

