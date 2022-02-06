import { useContext } from 'react';
import {UserContext} from '../Context/Context'

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

const ContextMenu = () => {    
  const {state, setState} = useContext(UserContext);

  // Извлекаем нужные данные
  const top = state.coordinates.top;
  const left = state.coordinates.left;
  const elTable = state.coordinates.el;

  const handleClickDeleteText  = (elTable: IelTable) => () => { // Событие отчищает ячейку
    const {iLetter, keyNumber} = elTable;
    const newTable = state.table.map((lineCells: IlineCells) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((elTable: IelTable) => {
          if (elTable.iLetter === iLetter) {
            elTable.text = '';
          };
          return elTable;
        });
      };
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const handleCliCcellLock  = (elTable: IelTable) => () => { // Событие блокирует ячейку 
    const {iLetter, keyNumber} = elTable;
    const newTable = state.table.map((lineCells: IlineCells) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((elTable: IelTable) => {
          if (elTable.iLetter === iLetter) {
            elTable.status === 'open' ? elTable.status = 'looc' : elTable.status = 'open';
          };
          return elTable;
        });
      }
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const ButtonDeleteText = (elTable: IelTable) => { // Функция  проверяет свойство  элемента если и дает  возможные события
    if (elTable.status === 'open') {
      return <button onClick={handleClickDeleteText(elTable)}>отчистить</button>;
    };
    return null;
  };

  const context =  (
    <ul className="right-click-menu" style={{ 'top': top, 'left': left, 'margin': 0, 'padding': 0, 'position': 'absolute', background: '#C0C0C0', opacity: .7}}>
      <ol> <button onClick={handleCliCcellLock(elTable)}>{elTable === 'open' ? 'заморозить' : 'разморозить'}</button></ol>
      <ol>{ButtonDeleteText(elTable)}</ol>
  </ul>);

  return top === 0 && left === 0 ? null : context;  // Условия для отрисовки компонента контекстного меню с координатами всплытия
};
 
export default ContextMenu;