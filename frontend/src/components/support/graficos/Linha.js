import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';


const LinhaGraphic = (dados) => {
  const [dataGrap, setDataGrap] = useState(dados.props)
  const [ddos, setDdos] = useState([]);
  useEffect(() => {
    // console.log(ddos.length)
    dados.props[0] ? objetoArray(dados.props[0]) : objetoArray({})
  }, [dados.props])
  function objetoArray(obj) {
    let chave = Object.keys(obj)
    let valor = Object.values(obj)
    let arr = []
    for (let i = 0; i < chave.length; i++) {
      let base = chave[i]
      let str = base.split('_').join(' ')
      arr.push(JSON.parse(`{"nome":"${str}","rotulo":"${valor[i]}" }`))
    }
    setDdos(arr)
    // console.log(ddos)
    return
  }
  return (
      <>
      {(ddos.length > 0) ?
        (
            <LineChart width={1150} height={300} data={ddos}>
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="rotulo" fill="rgb(63, 81, 181)" />
          </LineChart>
          )
          :(null)
        }
        </>
  );
}

export default LinhaGraphic;