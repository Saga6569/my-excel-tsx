import React, { useContext } from 'react';
import {UserContext} from '../Context/Context'

const ContextMenu = () => {

    const {coordinates} = useContext(UserContext).coordinatesСhange

    const {table, setTable } = useContext(UserContext).tableСhange

    const top = coordinates.top ?? 0
    const left = coordinates.left ?? 0

    const el = coordinates.el ?? {}
    
    const handleClikc = (el: { iLetter: any; keyNumber: any; }) => () => { // это  событие  перезаписывает данные в ячейку
        const {iLetter, keyNumber} = el;
        const newTable = table.map((el: { lineNumber: any; cells: any[]; }) => {
          if (el.lineNumber === keyNumber) {
           el.cells.map((cell) => {
             if (cell.iLetter === iLetter) {
              cell.state === 'open' ?  cell.text = '' : alert('ячейка заблокирована для изменения')
             }
             return cell;
           })
          }
          return el;
        })
        setTable(newTable);
      };


      const handleLooc = (el: { iLetter: any; keyNumber: any; }) => () => {  // событие двойного клика которая блокирует ячейку для изменения 
        console.log(el)
        const {iLetter, keyNumber} = el;
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
       
        setTable(newTable);
      };

      const renderTurtle = () => {

      }

    const context =  (
        <ul className="right-click-menu" style={{ 'top': top, 'left': left, 'margin': 0, 'padding': 0, 'position': 'absolute', background: '#C0C0C0', opacity: .7}}>
            <ol> <button onClick={handleLooc(el)}>{el === 'open' ? 'заморозить' : 'разморозить'}</button></ol>
            <ol> <button onClick={handleClikc(el)}>отчистить</button></ol>
            <ol> <button>задать type</button></ol>
        </ul>
      );
 
     return (
         <>
         {top === 0 && left === 0 ? null : context}
         </>
     )
    };
 
 export default ContextMenu;