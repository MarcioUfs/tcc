import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ComposedChart, Area  } from 'recharts';


const BarraGraphic = (dados) => {
  const [dataGrap, setDataGrap] = useState(dados.props)
  const [ddos, setDdos] = useState([]);
  useEffect(() => {
    // console.log(dataGrap)
    dados.props[0] ? objetoArray(dados.props[0]) : objetoArray({})
  }, [dados.props])
  function objetoArray(obj) {
    let chave = Object.keys(obj)
    let valor = Object.values(obj)
    let arr = []
    for (let i = 0; i < chave.length; i++) {
      let base = chave[i]
      let str = base.split('_').join(' ')
      let valInt = parseInt(valor[i])
      arr.push(JSON.parse(`{"nome":"${str}","rotulo":${valInt} }`))
    }
    setDdos(arr)
    // console.log(arr)
    return
  }
  return (
    <>
      {(ddos.length > 0) ?
        (
          <ComposedChart  width={1150} height={300} data={ddos}>
            <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <Line  dataKey="rotulo" fill="rgb(163, 1, 1)" stroke="rgb(163, 1, 1)" type="monotone"/>
            {/* <Area type="monotone" dataKey="rotulo" fill="#8884d8" stroke="#8884d8" /> */}
            <Bar dataKey="rotulo" fill="rgb(63, 81, 181)" barSize={20} label="rotulo" name="Resultado"/>
          </ComposedChart >
        ) : (null)
        }
    </>
  );
}

export default BarraGraphic;