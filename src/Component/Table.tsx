import { useContext, useEffect} from 'react';
import {UserContext} from '../Context/Context'

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

  const letterCoordinates = arrEN.slice(0, width ?? 0);  // Создаем  массив буквенных координат (пример width = 3 [A, B, C])
  const digitCoordinates = creatingCoordinatesDigits(height ?? 0); // Создаем  массив числовых координат (пример height = 3 [1, 2, 3])

  useEffect(() => {
    setState({...state, table: createTable})
  },[height, width]);

  const createTable  = digitCoordinates.map((number) => { // Создается нумерованная колляция объектов с указанием номером итерации и буквой
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

  const handleChange = (option: any) => (e: { target: { value: string; }; }) => { // Это событие  перезаписывает данные в ячейку
    const {iLetter, keyNumber} = option;
    const newTable = state.table.map((el: { lineNumber: string; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
        el.cells.map((cell) => {
          if (cell.iLetter === iLetter) {
            cell.state === 'open' ?  cell.text = e.target.value : console.log('ячейка заблокирована для изменения')
          };
          return cell;
        });
      };
      return el;
    })
    setState({...state, table: newTable});
  };

  const handleLooc = (option: any) => () => {  // Событие двойного клика которая блокирует ячейку для изменения 
    const {iLetter, keyNumber} = option;
    const newTable = state.table.map((el: { lineNumber: string; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
        el.cells.map((cell) => {
          if (cell.iLetter === iLetter) {
            cell.state === 'open' ? cell.state = 'looc' : cell.state = 'open'
          };
          return cell;
        });
      };
      return el;
    });

  setState({...state, table: newTable});
  };




  const hendlerContextMenu = (el: {}) => (e: { preventDefault: () => void; clientY: number; clientX: number; }) => {
    e.preventDefault();
    const top = `${e.clientY}px`;
    const left = `${e.clientX}px`;
    setState({...state, coordinates:{top, left, el: el}});
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
    const collorCell = (status: string) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'};
    return (
      state.table.map((el: { lineNumber: string; cells: any; }) => {
        return <tr> 
                  <th>{el.lineNumber}</th>
                  {(el.cells).map((el: { state?: any; text?: string; iLetter?: number; keyNumber?: string; }) => <td style={collorCell(el.state)}>
                  <input className='item' onContextMenu={hendlerContextMenu(el)} onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                  </td>)}
             </tr>
      })
    );
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
    </div>
  );
};

export default Table;
