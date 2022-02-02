import { useContext } from 'react';
import {UserContext} from '../Context/Context'

const ContextMenu = () => {

  const {state, setState } = useContext(UserContext);

  // Извлекаем нужные данные
  const top = state.coordinates.top ?? 0;
  const left = state.coordinates.left ?? 0;
  const el = state.coordinates.el ?? {};

  const handleClikc = (el: { iLetter: number; keyNumber: string; }) => () => { // Событие отчищает ячейку
    const {iLetter, keyNumber} = el;
    const newTable = state.table.map((el: { lineNumber: string; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
        el.cells.map((cell) => {
          if (cell.iLetter === iLetter) {
            cell.state === 'open' ?  cell.text = '' : alert('ячейка заблокирована для изменения')
          };
          return cell;
        });
      };
      return el;
    })
    setState({...state, table: newTable});
  };

  const handleLooc = (el: { iLetter: number; keyNumber: string; }) => () => { // Событие блокирует ячейку 
    const {iLetter, keyNumber} = el;
    const newTable = state.table.map((el: { lineNumber: string; cells: any[]; }) => {
      if (el.lineNumber === keyNumber) {
        el.cells.map((cell) => {
          if (cell.iLetter === iLetter) {
            cell.state === 'open' ? cell.state = 'looc' : cell.state = 'open';
          };
          return cell;
        });
      }
      return el;
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