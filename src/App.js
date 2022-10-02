import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  setTimeout(async () => {
    const a = await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
      .then(response => response.json())
      .then(data => {
        setData({data: data.cand, time: new Date(), totalapurado: data.psi})
        return data
      });
      setLoading(false);
  }, 10000);
  return (
    <div className="App">
      <header className="App-header">
        {
          data?.time &&         (<h3>Ultima atualização: <span>{data?.time.getHours().toString()}:{String(data?.time.getMinutes()).padStart(2, "0")}:{String(data?.time.getSeconds()).padStart(2, "0")}</span></h3>)
        }
        {
           data?.totalapurado && (<h4>Seções apuradas: {data.totalapurado}%</h4>)
        }
          {
            loading && (<tr><td>Carregando...</td></tr>)
          }
        <table>
          {data && (<tr>
            <th>Candidato</th>
            <th>Porcentagem de votos</th>
            <th>Votos</th>
          </tr>)}
        {(data && !data.data) ? <tr><td>Carregando...</td></tr> : data?.data?.map((item) => {
          return (<tr>
            <td>{item.nm}</td>
            <td>{item.pvap}%</td>
            <td>{Number(item.vap).toLocaleString('en-US')}</td>
          </tr>)
        })}
        </table>
      </header>
      <footer><p>Feito por <a target="_blank" href="https://www.linkedin.com/in/coutinhomarco/" rel="noreferrer">Marco</a></p></footer>
    </div>
  );
}

export default App;
