import React, { useState, useEffect} from 'react';

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Table: React.FC<any> = (props) => {
  
  const {height, width} = props.option;
   
  const creatingCoordinatesDigits = (a: number) => {
    const result: Array<number> = []
    for (let i = 1; i <= a; i++) {
      result[i - 1] = i
    }
    return result
  }

  const initialLetterCoordinates: Array<string> = arrEN.slice(0, width);
  const initialDigitCoordinates: Array<number> = creatingCoordinatesDigits(height);
  
  const [letterCoordinates, setLetterCoordinates] = useState(initialLetterCoordinates);
  const [digitCoordinates, setDigitCoordinates] = useState(initialDigitCoordinates);

  const createTable  = digitCoordinates.map((number) => {
    const lineNumber = number
      const cells = letterCoordinates.map((tab) => {
        const iLetter = tab
        const keyNumber = number;
        const text = '';
        const state = 'open';
        const cell = {iLetter, keyNumber, text, state}
        return cell;
      })
    return {lineNumber, cells}
  });

  const [table, setTable] = useState(createTable);

  useEffect((): void => {
    setLetterCoordinates(initialLetterCoordinates)
    setDigitCoordinates(initialDigitCoordinates)
  }, [props]);

  useEffect((): void => {
    setTable(createTable)
  }, [letterCoordinates, digitCoordinates]);
  
  if (height === 0 && width === 0) {
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (option: { iLetter: any; keyNumber: any; text?: string; state?: string; }) => (e: { target: { value: string; }; }) => {

    const {iLetter, keyNumber} = option;

    const newTable = table.map((el) => {
      if (el.lineNumber === keyNumber) {
       el.cells.map((cell) => {
         if (cell.iLetter === iLetter) {
          cell.state === 'open' ?  cell.text = e.target.value : console.log('ячейка заблокирована для изменения')
         }
         return cell;
       })
      }
      return el
    })
    
    setTable(newTable);
  };

  const handleLooc = (option: { iLetter: any; keyNumber: any; text?: string; state?: string; }) => (e: React.MouseEvent) => {
    const {iLetter, keyNumber} = option;
    const newTable = table.map((el) => {
      if (el.lineNumber === keyNumber) {
       el.cells.map((cell) => {
         if (cell.iLetter === iLetter) {
          cell.state === 'open' ? cell.state = 'looc' : cell.state = 'open'
         }
         return cell;
       })
      }
      return el
    })
    setTable(newTable);
  };

  const handlerAddLetterCoordinates = () => {
    const newLetters = arrEN.slice(0, letterCoordinates.length + 1)
    return setLetterCoordinates(newLetters)
  };
  
  const handlerAddDigitCoordinates  = () => {
    const newArr = [...digitCoordinates, digitCoordinates[digitCoordinates.length - 1] + 1]
    setDigitCoordinates(newArr)
  };
 
  const iterCell = () => {
    const collorCell = (status: string) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'}
    return (
      table.map((el) => {
        return <tr>
                <th>{el.lineNumber}</th>
                {(el.cells).map((el) => <td style={collorCell(el.state)}>
                 <input className='item' onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                </td>)}
             </tr>
     }))
   };
   
    return (<div className="App">
        <tr>
        <th>{'N/N'}</th>
          {letterCoordinates.map((el) => <th>{el}</th>)}
          <button onClick={handlerAddLetterCoordinates}>{'+'}</button>
        </tr>
        {iterCell()}
        <button onClick={handlerAddDigitCoordinates}>{'+'}</button>
    </div>)
};

const App: React.FC = () => {
  
  
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { width, height } = size;

    const form =  <div className="App">
        <p>
          <label>Ширина таблицы </label>
          <input onChange={(e) => setSize({height, width: Number(e.target.value)})} name="width" type="number"  value={width}></input>
        </p>
        <p>
          <label>Высота таблицы </label>
          <input onChange={(e) => setSize({width, height: Number(e.target.value)})} name="height" type="number"  value={height}></input>
        </p> 
      </div>

    return (
      <div>
        {form}
        {<Table option={size}></Table>}
      </div>
    )
  };


export default App;
