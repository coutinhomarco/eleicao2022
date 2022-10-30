import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  setTimeout(async () => {
    asyncF();
  }, 10000);
  const asyncF = async () => {
    const fetchMethod = {'method': 'GET', 'mode': 'no-cors'}
      return fetch('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json', fetchMethod)
        .then((data) => data.json())
        .then((data) => {
      setData({data: data.cand, time: data.ht, totalapurado: data.pst})
      setLoading(false);
      });
    }
  useEffect(() => {
    const asyncF = async () => {
      const fetchMethod = {'method': 'GET', 'mode': 'no-cors'}
        const fetchData = await fetch('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json', fetchMethod)
        const data = await fetchData.json()
        setData({data: data.cand, time: data.ht, totalapurado: data.pst})
        setLoading(false);
      }
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {
          data?.time &&         (<h1>Ultima atualização: <span>{data?.time}</span></h1>)
        }
        {
           data?.totalapurado && (<h2>Seções apuradas: {data.totalapurado}%</h2>)
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
