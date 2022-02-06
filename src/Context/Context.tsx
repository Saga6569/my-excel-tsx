import  { createContext } from 'react';

type TsetState = (value: any) => typeof value;

interface Icontext {
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
  setState: TsetState;
}

export const UserContext = createContext<Icontext>({
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

