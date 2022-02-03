import { useContext, useEffect} from 'react';
import {UserContext} from '../Context/Context'

interface cell{
  iLetter?: string;
  keyNumber?: number;
  text?: string;
  status?: string;
}

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //  массив из которого берутся букенные кардинаты

const Table = () => {
  const {state, setState } = useContext(UserContext);

  const {height, width} = state.tableSize;

  const creatingCoordinatesDigits = (num: number) => { // Создает числовой массив длинной получаемого числа
    const result = [];
      for (let i = 1; i <= num; i++) {
        result[i - 1] = i;
      };
    return result;
  };

  const letterCoordinates = arrEN.slice(0, width );  // Создаем  массив буквенных координат (пример width = 3 [A, B, C])
  const digitCoordinates = creatingCoordinatesDigits(height); // Создаем  массив числовых координат (пример height = 3 [1, 2, 3])

  useEffect(() => {
    setState({...state, table: createTable})
  },[height, width]);

  const createTable  = digitCoordinates.map((number) => { // Создается нумерованная колляция объектов с указанием номером итерации и буквой
    const lineNumber = number;
      const cells = letterCoordinates.map((tab) => {
        const iLetter = tab;
        const keyNumber = number;
        const text = '';
        const status = 'open';
        const cell = {iLetter, keyNumber, text, status};
        return cell;
      })
    return {lineNumber, cells};
  });

  if (height === 0 && width === 0) {  
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (cell: cell) => (e: { target: { value: string; }; }) => { // Это событие  перезаписывает данные в ячейку
    const {iLetter, keyNumber} = cell;
    const newTable = state.table.map((lineCells: { lineNumber: number; cells: Array<{}> }) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((cell: cell) => {
          if (cell.iLetter === iLetter) {
            cell.status === 'open' ?  cell.text = e.target.value : console.log('ячейка заблокирована для изменения')
          };
          return cell;
        });
      };
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const handleLooc = (cell: cell) => () => {  // Событие двойного клика которая блокирует ячейку для изменения 
    const {iLetter, keyNumber} = cell;
    const newTable = state.table.map((lineCells: { lineNumber: number; cells: Array<{}> }) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((cell: cell) => {
          if (cell.iLetter === iLetter) {
            cell.status === 'open' ? cell.status = 'looc' : cell.status = 'open'
          };
          return cell;
        });
      };
      return lineCells;
    });
  setState({...state, table: newTable});
  };

  const hendlerContextMenu = (cell: cell) => (e: { preventDefault: () => void; clientY: number; clientX: number; }) => { //Событие правого клика которое записывает элемент и координаты для всплытия окна 
    e.preventDefault();
    const top = `${e.clientY}px`;
    const left = `${e.clientX}px`;
    setState({...state, coordinates:{top, left, el: cell}});
  }

  const handlerAddLetterCoordinates = (e: { stopPropagation: () => void; }) => { // Событие добавляет новую букву в систему координат [A, B, C] => [A, B, C, D]
    const newWidth = (state.tableSize.width ?? 0) + 1;
    e.stopPropagation();
    setState({...state, tableSize: {width: newWidth, height: height}});
  };
  
  const handlerAddDigitCoordinates  = (e: { stopPropagation: () => void; }) => { // Событие добавляет новую числовую в систему координат [1, 2, 3] => [1, 2, 3, 4]
    const newHeight = (state.tableSize.height ?? 0)+ 1;
    e.stopPropagation();
    setState({...state, tableSize:{width, height: newHeight}});
  };

  const iterCell = () => { // отрисовка таблицы
    const collorCell = (cell: cell) => cell.status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'};
    return (
      state.table.map((lineCells: { lineNumber: number; cells: Array<{}> }) => {
        return <tr> 
                  <th>{lineCells.lineNumber}</th>
                  {(lineCells.cells).map((cell: cell) => <td style={collorCell(cell)}>
                  <input className='item' onContextMenu={hendlerContextMenu(cell)} onChange={handleChange(cell)} onDoubleClick={handleLooc(cell)} type="text" value={cell.text}></input>
                  </td>)}
             </tr>
      })
    );
  };
   
  return (
    <div className="table">
      <tr>
        <th>{'N/N'}</th>
        {letterCoordinates.map((el) => <th key={el}>{el}</th>)}
        <button onClick={handlerAddLetterCoordinates}>{'+'}</button>
      </tr>
      {iterCell()}
      <button onClick={handlerAddDigitCoordinates}>{'+'}</button>
    </div>
  );
};

export default Table;
