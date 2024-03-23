import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import api from '../../../services/api';

import MenuAdmin from '../../support/menu/menu-admin';
import Footer from '../../support/footer/footer-admin';
import Barra from '../../support/cLoading/Barra';

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

import useStyles from './makeSend';

function SendFile() {
    const style = useStyles();
    const filesElement = useRef(null);
    const [headers, setHeaders] = useState();
    const [menuString] = useState('Dados');
    const [showBases, setShowBases] = useState([]);
    const [loadIcon, setLoadIcon] = useState(false);
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
    }, [filesElement])
    useEffect(() => {
        setLoadIcon(true)
        async function shw() {
            await api.get(`/databases/show`, headers)
                .then(function (dat) {
                    if (dat.status === 200) {
                        setLoadIcon(false)
                        setShowBases(dat.data)
                    }
                }).catch((err) => {
                    setLoadIcon(false)
                    console.log(err)
                })
        }
        shw()
    }, [headers])
    const sendFile = async () => {
        const dataForm = new FormData();
        for (const file of filesElement.current.files) {
            dataForm.append('file', file);
        }
        setLoadIcon(true);
        await api.post(`/databases/upload`, dataForm, headers)
            .then(function (dat) {
                if (dat.status === 200) {
                    setLoadIcon(false)
                    window.location.href = "/dados";
                }
            }).catch((err) => {
                setLoadIcon(false)
            })
    };
    async function deletarB(d) {
        const envio = JSON.parse(`{"dataCadastro":"${d}"}`)
        setLoadIcon(true)
        await api.post(`/databases/delete`, envio, headers)
            .then(function (dat) {
                if (dat.status === 200) {
                    setLoadIcon(false)
                    window.location.href = "/dados";
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    const ShwBases = (
        <div className={style.separador}>
            <h4>Bases existentes:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Ordem</th>
                        <th>Data</th>
                        <th>Total de fichas</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {showBases.map((base, index) => {
                        let str = ''
                        if (base === []) {
                            str = []
                        } else {
                            str = base.pref_cad.split("-")
                        }
                        return (
                            <tr key={index} value={base.pref_cad}>
                                <td>{index + 1}</td>
                                <td>{str[2]}/{str[1]}/{str[0]}*</td>
                                <td>{base.total}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="button"
                                        title="Excluir"
                                        alt="Excluir"
                                        onClick={(e) => { deletarB(base.pref_cad) }}>Deletar
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <br />
            <em>* Esta ação excluirá toda a base referente ao mes solicitado</em>
        </div>
    )
    
    const Entrada = (
        <div className={style.separador}>
            <h4>Selecione o arquivo:</h4>
            <input className={style.inputs} type="file" ref={filesElement} />
            <Button variant="contained" color="primary" onClick={sendFile}>Enviar &nbsp; <Send /></Button>
        </div>
    )
    
    const LoaBarra = (
        <div className={style.separador}>
            <h4>Carregando, Aguarde!</h4>
            <Barra />
        </div>
    )

    return (
        <div className={style.mainContainer}>
            <MenuAdmin view={menuString} />
            <Container className={style.listContainer}>
                {!loadIcon && Entrada}
                {!loadIcon && ShwBases}
                {loadIcon && LoaBarra}
                <Box pt={4}>
                    <Footer />
                </Box>
            </Container>
        </div>
    );
}

export default SendFile;