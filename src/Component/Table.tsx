import { useContext, useEffect } from 'react';
import { UserContext } from '../Context/Context'

interface IelTable{
  iLetter?: string;
  keyNumber?: number;
  text?: string;
  status?: string;
};

interface IlineCells{
  lineNumber: number; 
  cells: Array<{}>;
}

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //Массив из которого берутся буквенные координаты

const Table = () => {
  const {state, setState} = useContext(UserContext);
  const {height, width} = state.tableSize;

  const creatingCoordinatesDigits = (number: number) => { // Создает числовой массив длинной получаемого числа
    const result = [];
      for (let i = 1; i <= number; i++) {
        result[i - 1] = i;
      };
    return result;
  };

  const letterСoordinates  = arrEN.slice(0, width );  // Создаем  массив буквенных координат (пример width = 3 [A, B, C])
  const digitCoordinates = creatingCoordinatesDigits(height); // Создаем  массив числовых координат (пример height = 3 [1, 2, 3])

  useEffect(() => {
    setState({...state, table: createTable})
  },[height, width]);

  const createTable  = digitCoordinates.map((number) => { // Создается нумерованная коллекция объектов с указанием номером итерации и буквой
    const lineNumber = number;
      const cells = letterСoordinates.map((letter) => {
        const iLetter = letter;
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

  const handleChange = (elTable: IelTable) => (e: { target: { value: string; }; }) => { // Это событие перезаписывает данные в ячейку
    const {iLetter, keyNumber} = elTable;
    const newTable = state.table.map((lineCells: IlineCells) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((elTable: IelTable) => {
          if (elTable.iLetter === iLetter) {
            elTable.status === 'open' ?  elTable.text = e.target.value : console.log('ячейка заблокирована для изменения')
          };
          return elTable;
        });
      };
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const handleDoubleClick = (elTable: IelTable) => () => {  // Событие двойного клика которая блокирует ячейку для изменения 
    const {iLetter, keyNumber} = elTable;
    const newTable = state.table.map((lineCells: IlineCells) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((elTable: IelTable) => {
          if (elTable.iLetter === iLetter) {
            elTable.status === 'open' ? elTable.status = 'looc' : elTable.status = 'open'
          };
          return elTable;
        });
      };
      return lineCells;
    });
  setState({...state, table: newTable});
  };

  const hendleContextMenu = (elTable: IelTable) => (e: { preventDefault: () => void; clientY: number; clientX: number; }) => { // Событие правого клика которое записывает элемент и координаты для всплытия окна 
    e.preventDefault();
    const top = `${e.clientY}px`;
    const left = `${e.clientX}px`;
    setState({...state, coordinates:{top, left, el: elTable}});
  };

  const handleClickAddCordinats = (name: string) => (e: { stopPropagation: () => void; }) => { // Событие добавляет новую букву в систему координат [A, B, C] => [A, B, C, D]
    e.stopPropagation();
    if (name === 'width') {
      setState({...state, tableSize: {width: width + 1, height: height}});
      return;
    }
    setState({...state, tableSize: {width: width , height: height + 1}});
  };
  
  const iterCell = () => { // Отрисовка таблицы
    const collorCell = (elTable: IelTable) => elTable.status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'};
    return (
      state.table.map((lineCells: IlineCells) => {
        return <tr> 
                  <th>{lineCells.lineNumber}</th>
                  {(lineCells.cells).map((elTable: IelTable) => <td style={collorCell(elTable)}>
                  <input className='item' onContextMenu={hendleContextMenu(elTable)} onChange={handleChange(elTable)} onDoubleClick={handleDoubleClick(elTable)} type="text" value={elTable.text}></input>
                  </td>)}
             </tr>
      })
    );
  };
   
  return (
    <div className="table">
      <tr>
        <th>{'N/N'}</th>
        {letterСoordinates.map((letter) => <th key={letter}>{letter}</th>)}
        <button onClick={handleClickAddCordinats('width')}>{'+'}</button>
      </tr>
      {iterCell()}
      <button onClick={handleClickAddCordinats('height')}>{'+'}</button>
    </div>
  );
};

export default Table;
