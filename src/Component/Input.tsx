import React, { useContext} from 'react';
import {UserContext} from '../Context/Context'

const Input = () => {
  const {state, setState } = useContext(UserContext);
  const { width, height } = state.tableSize;
  const form =  (<div className="form">
         <p>
           <label>Ширина таблицы</label>
           <input name="width" onChange={(e) => setState({...state, tableSize: {width: Number(e.target.value), height}})} type="number"  value={width}></input>
         </p>
         <p>
           <label>Высота таблицы</label>
           <input name="height" onChange={(e) => setState({...state, tableSize: {height: Number(e.target.value), width}})} type="number" value={height}></input>
         </p>
       </div>);
       
  return (<div className='creat-table'>{form}</div>);
};

export default Input;
