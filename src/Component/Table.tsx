import React, { useContext, useEffect} from 'react';
import {UserContext} from '../Context/Context'

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //  массив из которого берутся букенные кардинаты

const Table= () => {
 
  const {tableSize, setTableSize } = useContext(UserContext).tableSizeСhange

  const {table, setTable } = useContext(UserContext).tableСhange

  const {setCoordinates } = useContext(UserContext).coordinatesСhange

  const {height, width} = tableSize;  // извлекаю из пропса  дынные

  const creatingCoordinatesDigits = (a: number) => { /// создает числовой массив длинной получаемого числа  
    const result = [];
    for (let i = 1; i <= a; i++) {
      result[i - 1] = i;
    }
    return result;
  };

  useEffect(() => {
    setTable(createTable)
  },[height, width])

  const letterCoordinates = arrEN.slice(0, width ?? 0);  // создаем  массви кубвенных кардинат (пример width = 3 [A, B, C])
  const digitCoordinates = creatingCoordinatesDigits(height ?? 0); // создаем  массви числовых кординат (пример height = 3 [1, 2, 3])

  const createTable  = digitCoordinates.map((number) => {   //  создается  нумерованная колеция объектов с указание номером итерации и буквой 
    const lineNumber = number;
      const cells = letterCoordinates.map((tab) => {
        const iLetter = tab;
        const keyNumber = number;
        const text = '';
        const state = 'open';
        const cell = {iLetter, keyNumber, text, state};
        return cell;
      })
    return {lineNumber, cells};
  });

  if (height === 0 && width === 0) {  
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (option: any) => (e: { target: { value: any; }; }) => { // это  событие  перезаписывает данные в ячейку
    console.log('123')
    const {iLetter, keyNumber} = option;
    const newTable = table.map((el: { lineNumber: any; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
       el.cells.map((cell) => {
         if (cell.iLetter === iLetter) {
          cell.state === 'open' ?  cell.text = e.target.value : console.log('ячейка заблокирована для изменения')
         }
         return cell;
       })
      }
      return el;
    })
    setTable(newTable);
  };

  const handleLooc = (option: { iLetter: any; keyNumber: any; }) => () => {  // событие двойного клика которая блокирует ячейку для изменения 
    const {iLetter, keyNumber} = option;
    const newTable = table.map((el: { lineNumber: any; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
       el.cells.map((cell) => {
         if (cell.iLetter === iLetter) {
          cell.state === 'open' ? cell.state = 'looc' : cell.state = 'open'
         }
         return cell;
       })
      }
      return el;
    })
   
    setTable([...newTable]);
  };

  const hendlerContextMenu = (el: any) => (e: { preventDefault: () => void; clientY: any; clientX: any; }) => {
    e.preventDefault();
    const top = `${e.clientY}px`;
    const left = `${e.clientX}px`;
    setCoordinates({top, left, el: el})
  }

  const handlerAddLetterCoordinates = () => {  // событие добавляет новую букву  в систему кардинат [A, B, C] => [A, B, C, D]
    const newWidth = (tableSize.width ?? 0) + 1
    console.log(newWidth)
    setTableSize({width: newWidth, height})
  };
  
  const handlerAddDigitCoordinates  = () => { // событие добавляет новую число в систему кардинат [1, 2, 3] => [1, 2, 3, 4]
    const newHeight = (tableSize.height ?? 0)+ 1
    setTableSize({width, height: newHeight})
  };
  
  const iterCell = () => { // отрисовка таблицы
    
    const collorCell = (status: string) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'}
    return (
      table.map((el: { lineNumber: number; cells: any; }) => {

        return <tr> 
                <th>{el.lineNumber}</th>
                {(el.cells).map((el: { state?: any; text?: any; iLetter?: any; keyNumber?: any; }) => <td style={collorCell(el.state)}>
                 <input className='item' onContextMenu={hendlerContextMenu(el)} onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                </td>)}
             </tr>
     }))
   };
   
    return (
        <div className="table">
        <tr>
          <th>{'N/N'}</th>
          {letterCoordinates.map((el) => <th>{el}</th>)}
          <button onClick={handlerAddLetterCoordinates}>{'+'}</button>
        </tr>
        {iterCell()}
        <button onClick={handlerAddDigitCoordinates}>{'+'}</button>
      </div>)


};

  export default Table;
