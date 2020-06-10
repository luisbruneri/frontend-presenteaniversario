import React, {useState, useEffect} from 'react';

import api from './api';

function App() 
{
  const [lista, setLista] = useState([]); 

  useEffect(() => {
        api.get('/presente').then((response) =>{
            const itens = response.data;
            setLista(itens);
        })
}, [])

  return (
      <table>
          {
              lista.map(item =>(
                  <tr key = {item.id}>
                      <td>{item.id}</td>
                      <td>{item.nome_produto}</td>
                      <td>{item.valor}</td>
                      <td>{item.destinatario}</td>
                  </tr>
              ))
          }

      </table>
  );
}

export default App;
