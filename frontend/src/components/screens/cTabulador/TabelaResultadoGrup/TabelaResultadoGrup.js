import React, { useEffect, useState, useContext } from 'react'
import api from '../../../../services/api';
import { Context } from '../../../../Context/DataContext';
import Especi from '../Especi/Especi';
import '../tabulador.css';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
const TabelaResultadoGrup = (props) => {
    const [headers, setHeaders] = useState('');
    const [dados, setDados] = useState([]);
    const { val, receBack } = useContext(Context);

    useEffect(() => {
        props.mm.length > 0 ? setDados(props.mm) : setDados([])
    }, [props.mm]);

    useEffect(() => {
        let token
        if (localStorage.length > 1) {
            token = localStorage.getItem('@cadunico-Token');
        } else {
            token = sessionStorage.getItem('@cadunico-Token')
        }
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setHeaders(header)
    }, []);

    async function handleSubmit(e) {
        receBack([])
        const valu = val;
        valu.numero = `${e.target.value}`
        e.preventDefault()
        api.post('/tabulador/totalresult', valu, headers)
            .then(function (dat) {
                receBack(dat.data)
            })
            .catch(function (err) {
                console.log(err);
            })
    };
    
    return (
        <div className="tableresult">
            <TableContainer sx={{ height: 250 }}>
                <Table sx={{ height: "max-content" }}>
                    <thead>
                        <tr>
                            {dados.map((elemento, index) => {
                                let base = elemento.codigo
                                let str = base.split('_').join(' ').replace('ø', ',').toUpperCase()
                                return <th key={index}>{str}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {dados.map((elemento, index) => {
                                return <td key={index}>
                                    <ul>{elemento.resultado}</ul>
                                    <ul>{elemento.percentual}</ul>
                                    <ul>
                                        <form onSubmit={handleSubmit} method="post">
                                            {
                                                (elemento.resultado) !== '0' ?
                                                    (<>
                                                        <Button
                                                            title="Visualizar"
                                                            alt="Visualizar"
                                                            variant="contained"
                                                            color="primary"
                                                            type="submit"
                                                            size="small"
                                                            value={elemento.descritor}
                                                            onClick={function (e) { handleSubmit(e) }}>
                                                            VER
                                                        </Button>
                                                    </>)
                                                    :
                                                    (<>
                                                        <Button
                                                            type="button"
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            disabled>
                                                            VER
                                                        </Button>
                                                    </>)
                                            }
                                        </form>
                                    </ul>
                                </td>
                            })}
                        </tr>
                    </tbody>
                </Table>
            </TableContainer>
            <Especi />
        </div>
    )
}
export default TabelaResultadoGrup;