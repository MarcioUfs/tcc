import React, { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import { Context } from '../../../Context/DataContext'
import Barra from '../../support/cLoading/Barra';
// import MenuAdmin from '../menu/menu-admin';
import MenuAdmin from '../../support/menu/menu-admin';
import TabelaResultadoGrup from './TabelaResultadoGrup/TabelaResultadoGrup';
// import Footer from "../footer/footer-admin";
import Footer from "../../support/footer/footer-admin";
import './tabulador.css';
import useStyles from './makeTabulador';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import Container from '@material-ui/core/Container';
import Send from '@material-ui/icons/Send';

const meses = [
    { mes: "Janeiro", valor: "01" }, { mes: "Fevereiro", valor: "02" }, { mes: "Março", valor: "03" },
    { mes: "Abril", valor: "04" }, { mes: "Maio", valor: "05" }, { mes: "Junho", valor: "06" },
    { mes: "Julho", valor: "07" }, { mes: "Agosto", valor: "08" }, { mes: "Setembro", valor: "09" },
    { mes: "Outubro", valor: "10" }, { mes: "Novembro", valor: "11" }, { mes: "Dezembro", valor: "12" }
]

const Tabulador = () => {
    const [coluna, setColuna] = useState("dcod_est_cadastral_fam");
    const [pbf] = useState('0');
    const [mes, setMes] = useState(getMyMonth());
    const [ano, setAno] = useState(`${new Date().getFullYear()}`);
    const [dados, setDados] = useState([]);
    const [waitBar, setWaitBar] = useState(false);
    const [enviar, setEnviar] = useState();
    const [numero] = useState(-1);
    const [municipios, setMunicipios] = useState([])
    const [datGeografica, setDatGeografica] = useState({ codigo: 'dcd_ibge', valor: '28' })
    const [headers, setHeaders] = useState('');
    const [blocos, setBlocos] = useState([]);
    const { receDat, receBack } = useContext(Context);
    const style = useStyles();

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
        setEnviar(JSON.parse(`{
            "pbf":{"codigo":"dmarc_pbf","valor":""},
            "coluna":"${coluna}",
            "dataCadastro":{"codigo":"pref_cad","valor":"${ano}-${mes}"},
            "selecaogeografica": {"codigo":"${datGeografica.codigo}","valor":"${datGeografica.valor}"},
            "numero":"${numero}",
            "filtros": {
                "dados":[
                    {
                        "coluna":"pfx_idade",
                        "valor":["1"]
                    },
                    {
                        "coluna":"dcod_escoa_sanitario_domic_fam",
                        "valor":["1"]
                    },
                    {
                        "coluna":"dcod_material_domic_fam",
                        "valor":["1"]
                    }
                ]
                }
        }`))
    }, [numero, ano, coluna, pbf, mes, datGeografica]);

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
        api.get('/list/bloco', headers)
            .then(function (dat) {
                setBlocos(dat.data)
            })
            .catch(function (err) {
                console.log(err)
                // alert("Sessão expirada, efetue novo login!")
                window.location.href = "/";
            })
    }, []);

    function getMyMonth() {
        let mesAtual = new Date().getMonth() + 1;
        if (mesAtual < 10) {
            mesAtual = `0${mesAtual}`
        }
        return mesAtual;
    };

    function fullyear() {
        const anoAtual = new Date().getFullYear();
        let anoBase = 2015;
        let arrayAnos = []
        for (anoBase; anoBase <= anoAtual; anoBase++) {
            arrayAnos.push(anoBase)
        }
        return arrayAnos
    };

    function bar() {
        if (waitBar === true) {
            return (
                <div className={style.separador}>
                    <h4>Aguarde, sua solicitação está sendo processada...</h4>
                    <Barra />
                </div>
            )
        }

    };

    async function handleSubmit(e) {
        receBack([])
        e.preventDefault()
        const values = await JSON.parse(`{
            "pbf":{"codigo":"dmarc_pbf","valor":""},
            "coluna":"${coluna}",
            "dataCadastro":{"codigo":"pref_cad","valor":"${ano}-${mes}"},
            "selecaogeografica": {"codigo":"${datGeografica.codigo}","valor":"${datGeografica.valor}"},
            "numero":"${numero}",
            "filtros": {
                "dados":[
                    {
                        "coluna":"pfx_idade",
                        "valor":["1"]
                    },
                    {
                        "coluna":"dcod_escoa_sanitario_domic_fam",
                        "valor":["1"]
                    },
                    {
                        "coluna":"dcod_material_domic_fam",
                        "valor":["1"]
                    }
                ]
                }
            }`);
        receDat(values)
        setWaitBar(true);
        bar();
        api.post('/tabulador', values, headers)
            .then(function (dat) {
                if (dat.status === 200) {
                    setWaitBar(false);
                    setDados(dat.data)
                    if (dados.length === 0) {
                        setWaitBar(false)
                    }
                }
            })
            .catch(function (err) {
                // console.log(err)
                alert("Erro no envio do serviço!")
                window.location.href = "/";
            })

    }

    function selecCodVal(e) {
        if (e.target.value === "01" || e.target.value === "02" || e.target.value === "03") {
            setDatGeografica({ "codigo": "mesorregiao_geografica", "valor": e.target.value })
        } else {
            setDatGeografica({ "codigo": e.target.name, "valor": e.target.value })
        }
    }

    return (
        <div className={style.mainContainer}>
            <MenuAdmin view={"Pesquisa tabulador"} />
            <Container className={style.listContainer}>
                <div>
                    <h1 className={style.titulo}>Tabulador do Cadastro Único Sergipe</h1>
                    <form className={style.formestilo} onSubmit={handleSubmit} method="post">
                        <div className={style.selects}>
                            <div className="selects">
                                <h4>Selecione mes e ano:</h4>
                                <select value={mes} onChange={(e) => setMes(e.target.value)}>
                                    {meses.map((m) => (
                                        <option key={m.valor} value={m.valor}>{m.mes}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="selects" >
                                <select value={ano} onChange={(e) => setAno(e.target.value)}>
                                    {fullyear().map((f) => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="selects">
                                    <h4>Seleção geográfica:</h4>
                                    <select name="dcd_ibge" onChange={(e) => { selecCodVal(e) }}>
                                        <option value="28">Sergipe - geral</option>
                                        {/* <option value="02">Agreste Sergipano</option>
                                        <option value="03">Leste Sergipano</option>
                                        <option value="01">Sertão Sergipano</option> */}
                                        {municipios.map((f) => (
                                            <option key={f.id_uf} value={f.codigo_municipio_completo}>{f.nome_municipio} - {f.codigo_municipio_completo} - {f.nome_mesorregiao} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="selects">
                                <h4>Coluna:</h4>
                                <select value={coluna} onChange={(e) => setColuna(e.target.value)}>
                                    {blocos.map((b) => (
                                        <option key={b.id} value={b.codigo}>{b.descricao}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="botaoPesquisaDiv">
                                <Button variant="contained" color="primary" type="submit" onClick={() => setWaitBar(true)}>Enviar &nbsp; <Send /></Button>
                            </div>
                        </div>
                    </form>
                    {waitBar ?
                        bar() :
                        (<>
                            {<TabelaResultadoGrup fobos={enviar} mm={dados} />}
                        </>)
                    }
                </div>
                <br />
                <Box pt={4}>
                    <Footer />
                </Box>
            </Container>
        </div>
    )
}
export default Tabulador;