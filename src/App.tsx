import React, { useState, useEffect} from 'react';

const arrEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //  массив из которого берутся букенные кардинаты

const Table: React.FC<any> = (props) => {
  
  const {height, width} = props.option;  // извлекаю из пропса  дынные
   
  const creatingCoordinatesDigits = (a: number) => { /// создает числовой массив длинной получаемого числа  
    const result: Array<number> = [];
    for (let i = 1; i <= a; i++) {
      result[i - 1] = i;
    }
    return result;
  };

  const initialLetterCoordinates: Array<string> = arrEN.slice(0, width);  // создаем  массви кубвенных кардинат (пример width = 3 [A, B, C])
  const initialDigitCoordinates: Array<number> = creatingCoordinatesDigits(height); // создаем  массви числовых кординат (пример height = 3 [1, 2, 3])
  
  const [letterCoordinates, setLetterCoordinates] = useState(initialLetterCoordinates); // задаем начальное значение хукам 
  const [digitCoordinates, setDigitCoordinates] = useState(initialDigitCoordinates); // задаем начальное значение хукам 

  const createTable  = digitCoordinates.map((number) => {   //  создается  нумерованная колеция объектов с указание номером итерации и буквой 
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

  const [table, setTable] = useState(createTable); // устанавливаем начальео  значение

  useEffect((): void => { // эфект  срабатывается  если даные пропса меняются 
    setLetterCoordinates(initialLetterCoordinates);
    setDigitCoordinates(initialDigitCoordinates);
  }, [props]);

  useEffect((): void => {   // эфект срабатывает  если меняется значение одного из массива кардинат
    setTable(createTable);
  }, [letterCoordinates, digitCoordinates]);
  
  if (height === 0 && width === 0) {  
    return (<div>{'задате данные для таблицы'}</div>)
  }

  const handleChange = (option: { iLetter: string; keyNumber: number; text?: string; state?: string; }) => (e: { target: { value: string; }; }) => { // это  событие  перезаписывает данные в ячейку
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
      return el
    })
    setTable(newTable);
  };

  const handleLooc = (option: { iLetter: string; keyNumber: number; text?: string; state?: string; }) => (e: React.MouseEvent) => {  // событие двойного клика которая блокирует ячейку для изменения 
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
      return el
    })
    setTable(newTable);
  };

  const handlerAddLetterCoordinates = () => {  // событие добавляет новую букву  в систему кардинат [A, B, C] => [A, B, C, D]
    const newLetters = arrEN.slice(0, letterCoordinates.length + 1);
    return setLetterCoordinates(newLetters);
  };
  
  const handlerAddDigitCoordinates  = () => { // событие добавляет новую число в систему кардинат [1, 2, 3] => [1, 2, 3, 4]
    const newArr = [...digitCoordinates, digitCoordinates[digitCoordinates.length - 1] + 1];
    setDigitCoordinates(newArr);
  };
 
  const iterCell = () => {   // отрисовка таблицы
    const collorCell = (status: string) => status === 'open' ? {border: 'solid #69c'} : {border: 'solid red'}
    return (
      table.map((el) => {
        return <tr>
                <th>{el.lineNumber}</th>
                {(el.cells).map((el) => <td style={collorCell(el.state)}>
                 <input className='item' onChange={handleChange(el)} onDoubleClick={handleLooc(el)} type="text" value={el.text}></input>
                </td>)}
             </tr>
     }))
   };
   
    return (<div className="App">
        <tr>
        <th>{'N/N'}</th>
          {letterCoordinates.map((el) => <th>{el}</th>)}
          <button onClick={handlerAddLetterCoordinates}>{'+'}</button>
        </tr>
        {iterCell()}
        <button onClick={handlerAddDigitCoordinates}>{'+'}</button>
    </div>)
};

const App: React.FC = () => {
  
  
  const [size, setSize] = useState({ width: 0, height: 0 }); //  создание наччальных значений хука с созданием размеров таблицы

  const { width, height } = size;

  // создание компонента  отвечающего за создание данных для  создание таблицы

    const form =  (<div className="App">    
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
      <div>
        {form}
        {<Table option={size}></Table>}
      </div>
    );
  };

export default App;
