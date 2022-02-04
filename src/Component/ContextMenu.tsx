import { useContext } from 'react';
import {UserContext} from '../Context/Context'

interface cell{
  iLetter?: string;
  keyNumber?: number;
  text?: string;
  status?: string;
}

const ContextMenu = () => {
  const {state, setState} = useContext(UserContext);

  // Извлекаем нужные данные
  const top = state.coordinates.top;
  const left = state.coordinates.left;
  const el = state.coordinates.el;

  const handleClikc = (el: cell) => () => { // Событие отчищает ячейку
    const {iLetter, keyNumber} = el;
    const newTable = state.table.map((lineCells: { lineNumber: number; cells: Array<{}> }) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((cell: cell) => {
          if (cell.iLetter === iLetter) {
            cell.status === 'open' ?  cell.text = '' : alert('ячейка заблокирована для изменения')
          };
          return cell;
        });
      };
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const handleLooc = (el: cell) => () => { // Событие блокирует ячейку 
    const {iLetter, keyNumber} = el;
    const newTable = state.table.map((lineCells: { lineNumber: number; cells: Array<{}> }) => {
      if (lineCells.lineNumber === keyNumber) {
        lineCells.cells.map((cell: cell) => {
          if (cell.iLetter === iLetter) {
            cell.status === 'open' ? cell.status = 'looc' : cell.status = 'open';
          };
          return cell;
        });
      }
      return lineCells;
    })
    setState({...state, table: newTable});
  };

  const context =  (
    <ul className="right-click-menu" style={{ 'top': top, 'left': left, 'margin': 0, 'padding': 0, 'position': 'absolute', background: '#C0C0C0', opacity: .7}}>
      <ol> <button onClick={handleLooc(el)}>{el === 'open' ? 'заморозить' : 'разморозить'}</button></ol>
      <ol> <button onClick={handleClikc(el)}>отчистить</button></ol>
  </ul>);

  return top === 0 && left === 0 ? null : context;  // Условия для отрисовки компонента контекстного меню с координатами всплытия
};
 
export default ContextMenu;