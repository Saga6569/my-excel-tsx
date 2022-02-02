import  { createContext } from 'react';

// interface context{
//   tableSizeСhange: {
//     tableSize: object,
//     setTableSize: () => any
//   },
//   tableСhange: {
//     table: Array<object>,
//     setTable: () => any
//   },
//   coordinatesСhange: {
//     coordinates: object,
//     setCoordinates: ()  => any
//   }
// };


export const UserContext = createContext<any>({
  tableSizeСhange: {
    tableSize : {},
    setTableSize: () => {},
  },
  tableСhange : {
    table: [],
    setTable: () => {},
  },
  coordinatesСhange: {
    coordinates : {},
    setCoordinates: () => {},
  }
});


