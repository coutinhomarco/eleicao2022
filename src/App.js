import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  setTimeout(async () => {
    const a = await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then(response => response.json())
      .then(data => {
        setData({data: data.cand, time: new Date(), totalapurado: data.psi})
        return data
      });

  }, 10000);
  return (
    <div className="App">
      <header className="App-header">
        {
           data?.totalapurado && (<p>Seções apuradas: {data.totalapurado}</p>)
        }
        {
          data?.time &&         (<p>Ultima atualização: <span>{data?.time.getHours().toString()}:{String(data?.time.getMinutes()).padStart(2, "0")}:{String(data?.time.getSeconds()).padStart(2, "0")}</span></p>)

        }
        <table>
          <tr>
            <th>Candidato</th>
            <th>Porcentagem de votos</th>
            <th>Votos</th>
          </tr>
        {(data && !data.data) ? <tr><td>Carregando...</td></tr> : data?.data?.map((item) => {
          return (<tr>
            <td>{item.nm}</td>
            <td>{item.pvap}%</td>
            <td>{item.vap.toString()}</td>
          </tr>)
        })}
        </table>
      </header>
    </div>
  );
}

export default App;
