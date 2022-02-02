import  { createContext } from 'react';

export const UserContext = createContext<any>({
  state: {
    tableSize : {
      width: 0,
      height: 0
    },
    table: [],
    coordinates : {},
    setState: () => {},
  },
});

