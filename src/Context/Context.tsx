import  { createContext } from 'react';

type setState = (value: any) => typeof value;

interface context {
  state: {
    tableSize : {
      height: number;
      width: number;
    },
    table: Array< { lineNumber: number; cells: Array<{}> }>,
    coordinates : {
      left: number;
      top: number;
      el: {}
    },
  }
  setState: setState;
}




export const UserContext = createContext<context>({
  state: {
    tableSize : {
      height: 0,
      width: 0,
    },
    table: [],
    coordinates : {
      left: 0,
      top: 0,
      el: {}
    },
  },
  setState: () => {},
});

