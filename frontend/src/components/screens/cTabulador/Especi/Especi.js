import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { Context } from '../../../../Context/DataContext';
import maskMoney from '../../../../functions/maskMoney';
import maskData from '../../../../functions/maskData';
import Button from '@mui/material/Button';
// import Modal from '../../folhaResumoModal/FichaModal.jsx';
import Modal from '../../../support/folhaResumoModal/FichaModal';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';

const Especi = () => {
    const [especific, setEspecific] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [parente, setParente] = useState([]);
    const [headers, setHeaders] = useState('');
    const [ff, setFf] = useState([]);
    const { val, resultadoBack } = useContext(Context);
    const [abrir, setAbrir] = useState(false);

    useEffect(() => {
        api.get('/list/municipios', headers)
            .then(function (dat) {
                setMunicipios(dat.data)
            })
            .catch(function (err) {
                console.log(err)
                // alert("Sessão expirada, efetue novo login!")
                window.location.href = "/";
            })
    }, []);

    useEffect(() => {
        api.get('/list/parente', headers)
            .then(function (dat) {
                setParente(dat.data)
            })
            .catch(function (err) {
                console.log(err)
                // alert("Sessão expirada, efetue novo login!")
                window.location.href = "/";
            })
    }, []);

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
    }, [municipios]);

    useEffect(() => {
        setEspecific(resultadoBack);
    }, [resultadoBack]);

    function munFilter(codIbge) {
        for (let filtro of municipios) {
            if (filtro.codigo_municipio_completo === codIbge) {
                return (filtro.nome_municipio);
            }
        }
    };

    function parentFilter(codParente) {
        // console.log(codParente)
        if (codParente === '') {
            return 'SEM INFORMAÇÃO'
        } else {
            for (let filtro of parente) {
                if (filtro.codigo === codParente) {
                    return (filtro.descricao);
                }
            }
        }
    };

    function handleCli(cod, ref) {
        setAbrir(false);
        let values = {}
        values.code_fam = `${cod}`
        values.refCad = `${ref}`
        api.post('/ficha/especrefcad', values, headers)
            .then(function (dat) {
                setFf(dat.data)
                setAbrir(true)
            })
            .catch(function (err) {
                // console.log(err)
                alert("Erro no envio da informação!")
                // window.location.href = "/";
            })
        return ff
    }

    const tabela = (
        (
            Object.values(especific).length > 0 ? (
                <TableContainer sx={{ height: 630 }}>
                    <Table sx={{ height: "max-content" }}>
                        <thead>
                            <tr>
                                <th>Ação</th>
                                <th>Código familiar</th>
                                <th>Nome</th>
                                <th>NIS</th>
                                <th>Renda familiar per capita</th>
                                <th>Renda total da familia</th>
                                <th>Parentesco</th>
                                <th>Última atualizacao</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {especific.map((registro, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Button
                                            title="Visualizar"
                                            alt="Visualizar"
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            value={registro.dcod_familiar_fam}
                                            name={registro.pref_cad}
                                            onClick={(e) => { handleCli(registro.dcod_familiar_fam, registro.pref_cad) }}
                                        // value={registro.dcod_familiar_fam}
                                        // name={registro.pnom_pessoa}
                                        // onClick={(e) => { handleCli(e.target) }}
                                        >VER</Button></td>
                                        <td>{registro.dcod_familiar_fam}</td>
                                        <td>{registro.pnom_pessoa}</td>
                                        <td>{registro.pnum_nis_pessoa_atual}</td>
                                        <td>{maskMoney(registro.dvlr_renda_media_fam, registro.pref_cad)}</td>
                                        <td>{maskMoney(registro.dvlr_renda_total_fam, registro.pref_cad)}</td>
                                        <td>{parentFilter(registro.pcod_parentesco_rf_pessoa)}</td>
                                        <td>{maskData(registro.ddat_atual_fam)}</td>
                                        <td>{registro.dnom_tip_logradouro_fam} {registro.dnom_titulo_logradouro_fam} {registro.dnom_logradouro_fam}, {isNaN(parseInt(registro.dnum_logradouro_fam)) ? ' ' : `${parseInt(registro.dnum_logradouro_fam)} - `} {registro.dnom_localidade_fam}</td>
                                        <td>{munFilter(registro.dcd_ibge)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </TableContainer>
            ) : null)
    )
    return (
        <div>
            {abrir && <Modal cod={ff} openner={abrir} />}
            {tabela}
        </div>
    )
}
export default Especi;