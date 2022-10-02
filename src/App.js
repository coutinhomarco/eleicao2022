import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  setTimeout(() => {
    fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then(response => response.json())
      .then(data => setData({data: data.cand, time: new Date()}));
  }, 4000);
  return (
    <div className="App">
      <header className="App-header">
        {
          data?.time &&         (<p>Ultima atualização: <span>{data?.time.getHours().toString()}:{data?.time.getMinutes().toString()}:{data?.time.getSeconds().toString()}</span></p>)

        }
        <table>
        {(data && !data.data) ? <tr><td>Carregando...</td></tr> : data?.data?.map((item) => {
          return (<tr>
            <td>{item.nm}</td>
            <td>{item.pvap}%</td>
          </tr>)
        })}
        </table>
      </header>
    </div>
  );
}

export default App;
