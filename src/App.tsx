import React, { useState, useEffect} from 'react';

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //  массив из которого берутся буквенные кардиналы


const ContextMeny = (props: { state: {top: number, left: number}; }) => {

const initPoint = props.state // Начально значение точек 

const [point, setPoint] = useState(initPoint) // Создаем хук с начальными значениями 

const {top, left} = point

useEffect((): void => { // Эффект срабатывается если данные пропса меняются 
  setPoint(initPoint)
}, [props]);


if (top === 0 && left === 0) { // Если координаты равны 0, то  нечего  не показываем
  return null
}

// Создаем компонент  с нужными  свойствами
  const context =  (
    <ul className="right-click-menu.active" style={{'top': `${top}px`, 'left': `${left}px`, 'margin': 0, 'padding': 0, 'position': 'absolute', background: '#C0C0C0', opacity: .7}}>
        <ol> <button >{'1'}</button></ol>
        <ol> <button>разморозить</button></ol>
        <ol> <button>отчистить</button></ol>
        <ol> <button>задать type</button></ol>
    </ul>)

  return (
    context
  )
};

const Table = (props: {option: {height: number, width: number}}) => {

  const [point, setPoint] = useState({top: 0, left: 0})

  const {height, width} = props.option;  // Извлекаю из пропса дынные

  const creatingCoordinatesDigits = (a: number) => { // Создает числовой массив длинной получаемого числа  

    const result: Array<number> = [];
    for (let i = 1; i <= a; i++) {
      result[i - 1] = i;
    }
    return result;
  };

  const initialLetterCoordinates: Array<string> = arrEN.slice(0, width);  // Создаем  массив буквенных координат (пример width = 3 [A, B, C])
  const initialDigitCoordinates: Array<number> = creatingCoordinatesDigits(height); // Создаем  массив числовых координат (пример height = 3 [1, 2, 3])
  
  const [letterCoordinates, setLetterCoordinates] = useState(initialLetterCoordinates); // Задаем начальное значение хукам 
  const [digitCoordinates, setDigitCoordinates] = useState(initialDigitCoordinates); // Задаем начальное значение хукам 

  const createTable  = digitCoordinates.map((number) => { // Создается  нумерованная коллекция объектов с указанием номером итерации и буквой  
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

  const [table, setTable] = useState(createTable); // Устанавливаем начально значение

  useEffect((): void => { // Эффект  срабатывается если данные пропса меняются 
    setLetterCoordinates(initialLetterCoordinates);
    setDigitCoordinates(initialDigitCoordinates);
  }, [props]);

  useEffect((): void => {   // Эффект срабатывает  если меняется значение одного из массива координат
    setTable(createTable);
  }, [letterCoordinates, digitCoordinates]);
  
  if (height === 0 && width === 0) {  
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (option: { iLetter: string; keyNumber: number; text?: string; state?: string; }) => (e: { target: { value: string; }; }) => { // Событие  перезаписывает данные в ячейку
    const {iLetter, keyNumber} = option;
    const newTable = table.map((el) => {
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

  const handleLooc = (option: { iLetter: string; keyNumber: number; text?: string; state?: string; }) => (e: React.MouseEvent) => {  // Событие двойного клика которая блокирует ячейку для изменения 
    const {iLetter, keyNumber} = option;
    const newTable = table.map((el) => {
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

  const handlerAddLetterCoordinates = () => {  // Событие добавляет новую букву  в систему координат [A, B, C] => [A, B, C, D]
    const newLetters = arrEN.slice(0, letterCoordinates.length + 1);
    return setLetterCoordinates(newLetters);
  };
  
  const handlerAddDigitCoordinates  = () => { // Событие добавляет новую числовую в систему координат [1, 2, 3] => [1, 2, 3, 4]
    const newArr = [...digitCoordinates, digitCoordinates[digitCoordinates.length - 1] + 1];
    setDigitCoordinates(newArr);
  };
  
  const hedlerClikcOpenContextMenu = (el: any) => (e: any) => { // Событие правый клик
    e.preventDefault();
    setPoint({top:e.clientY, left: e.clientX})
  };

  const iterCell = () => { // Отрисовка таблицы
    
    const collorCell = (status: string) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'}
    return (
      table.map((el) => {
        return <tr> 
                <th>{el.lineNumber}</th>
                {(el.cells).map((el) => <td style={collorCell(el.state)}>
                 <input className='item' onClick={() => setPoint({top: 0, left: 0})} onContextMenu={hedlerClikcOpenContextMenu(el)}  onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                </td>)}
             </tr>
     }))
   };
   
    return (
      <><div className='context'>
        {<ContextMeny state={point} />}
      </div>
        <div className="table">
        <tr>
          <th>{'N/N'}</th>
          {letterCoordinates.map((el) => <th>{el}</th>)}
          <button onClick={handlerAddLetterCoordinates}>{'+'}</button>
        </tr>
        {iterCell()}
        <button onClick={handlerAddDigitCoordinates}>{'+'}</button>
      </div></>)
};

const App: React.FC = () => {

  const [size, setSize] = useState({ width: 0, height: 0 }); //  Создание начальных значений хука с созданием размеров таблицы
  const { width, height } = size;

  // Создание компонента  отвечающего за создание данных для создания таблицы
    const form =  (<div className="form">    
        <p>
          <label>Ширина таблицы </label>
          <input onChange={(e) => setSize({height, width: Number(e.target.value)})} name="width" type="number"  value={width}></input> 
        </p>
        <p>
          <label>Высота таблицы </label>
          <input onChange={(e) => setSize({width, height: Number(e.target.value)})} name="height" type="number"  value={height}></input>
        </p> 
      </div>);


    return (
     <><div className='conext'></div>
     <div className='creat-table'>
        {form}
        {<Table option={size}></Table>}
      </div></>
    );
  };
  
export default App;
