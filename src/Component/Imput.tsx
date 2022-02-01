import React, { useContext} from 'react';
import {UserContext} from '../Context/Context'

const Imput: React.FC = () => {

  const {tableSize, setTableSize } = useContext(UserContext).tableSizeСhange
 
    const { width, height } = tableSize
 
     const form =  (<div className="form">    
         <p>
           <label>Ширина таблицы </label>
           <input name="width" onChange={(e) => setTableSize({width: Number(e.target.value), height})} type="number"  value={width ?? 0}></input>
         </p> 
         <p>
           <label>Высота таблицы </label>
           <input name="height" onChange={(e) => setTableSize({height: Number(e.target.value), width})} type="number" value={height ?? 0 }></input>
         </p> 
       </div>);
 
     return (
      <div className='creat-table'>
         {form}
       </div>
     );
   };
 
 export default Imput;