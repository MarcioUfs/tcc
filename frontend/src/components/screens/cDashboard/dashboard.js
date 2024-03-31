import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import MenuAdmin from '../../support/menu/menu-admin';
import Footer from '../../support/footer/footer-admin';
import Barra from '../../support/cLoading/Barra';
import Modal from '../../support/folhaResumoModal/FichaModal';

import discharge from '../../../functions/listDischarge';
import listarCol from '../../../functions/listColumns';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';

import useStyles from './make';
import './style.css';

const Dashboard = () => {
    const [numberRows, setNumberRows] = useState(0);
    const [searchItem, setSearchItem] = useState({ busca: 'dcd_ibge' }); //dcd_ibge
    const [columns] = useState({ coluna: listarCol() }); //dcod_familiar_fam
    const [searchItem1, setSearchItem1] = useState({ busca1: '' }); //2805307
    const [response, setResponse] = useState([]);
    const [waitBar, setWaitBar] = useState(false);
    const [cabeca, setCabeca] = useState([]);
    const [botao, setBotao] = useState(false);
    const [pageNumb, setPageNumb] = useState(1);
    const [limit] = useState({ limits: 100 });
    const [ff, setFf] = useState([]);
    const [abrir, setAbrir] = useState(false);
    const [headers, setHeaders] = useState('');
    const style = useStyles();

    useEffect(() => {
        api.get('/list')
            .then((dat) => {
                setCabeca(dat.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        if (searchItem1.busca1 !== '') {
            return setBotao(false);
        } else {
            return setBotao(true);
        }
    }, [searchItem1.busca1])

    useEffect(() => {
        setPageNumb(1)
    }, [numberRows])

    function handleSubmit(event) {
        event.preventDefault();
        const values = JSON.parse(`{"coluna":"${columns.coluna}","busca":"${searchItem.busca}","busca1":"${searchItem1.busca1}", "limit":${limit.limits}, "pageNumber":${pageNumb}}`);
        // console.log(JSON.stringify(values, null, 2))
        // alert(JSON.stringify(values))
        setWaitBar(true);
        api.post('/dashboard/busca', values)
            .then(function (dat) {
                if (dat.status === 200) {
                    setWaitBar(false);
                    setResponse(dat.data)
                }
            })
            .catch(function (err) {
                console.log(err);
            })
        api.post('/dashboard/contar', values)
            .then(function (dat) {
                if (dat.status === 200) {
                    setWaitBar(false);
                    setNumberRows(dat.data[0].count)
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    function handleChange(event) {
        const target = event.target;
        setSearchItem({ busca: target.value });
    }

    function handleChange2(event) {
        const target = event.target;
        setSearchItem1({ busca1: target.value });
    }

    function paginacao(c) {

        if (c === '+') {
            const actualPage = pageNumb + 1;
            setPageNumb(actualPage);
        }
        if (c === '-') {
            const actualPage1 = pageNumb - 1;
            if (actualPage1 <= 0) {
                return setPageNumb(1)
            } else {
                setPageNumb(actualPage1);
            }
        }
    }

    function buttonsPagination(resultResponse) {
        let buttonMore = false;
        let buttonLess = false;
        if (pageNumb === 1) {
            buttonLess = true;
        }
        if ((pageNumb * 100) > numberRows) {
            buttonMore = true
        }
        if (resultResponse > 0 && resultResponse <= limit.limits) {
            return (
                <>
                    <button type="submit" onClick={(e) => paginacao("-")} disabled={buttonLess}>-</button>
                    <h4>Resultados de {(pageNumb * 100) - 100} até {pageNumb * 100} de {numberRows} </h4>
                    <button type="submit" onClick={(e) => paginacao("+")} disabled={buttonMore}>+</button>
                </>
            )
        }
    }
    function showColumns() {
        const sp = discharge;
        const arrayC = [];
        for (let i = 0; i < cabeca.length; i++) {

            if (cabeca[i].codigo !== sp[i]) {
                arrayC.push(cabeca[i].descricao)
            }
        }
        // console.log(arrayC)
        return arrayC
    }
    function showDatas() {
        const sp = discharge;
        const arrayD = [];
        for (let i = 0; i < response.length; i++) {
            if (Object.keys(response[i]) !== sp[i]) {
                arrayD.push(response[i])
            }
        }
        // console.log(arrayD)
        return arrayD
    }
    // function listarCabecalho(entrada) {
    //     // console.log(entrada)
    //     for (let i = 0; i < 206; i++) {
    //         if (entrada === cabeca[i].codigo) {
    //             return (cabeca[i].descricao).toUpperCase()
    //             // console.log(i, entrada, cabeca[i].codigo)
    //         }
    //         //  else {
    //         //     // console.log(i)
    //         //     // , entrada, cabeca[i].codigo)
    //         // }
    //         // return (cabeca[i].descricao).toUpperCase()
    //     }
    //     return entrada

    // }
    // useEffect(() => {
    //     let columns = [];
    //     if (response.length > 0) {
    //         for (let i = 0; i < 206; i++) {
    //             columns.push(JSON.parse(`
    //                     {
    //                         "field": "${Object.keys(response[0])[i]}", 
    //                         "headerNamer":"${listarCabecalho(Object.keys(response[0])[i])}", 
    //                         "width": ${100}
    //                     }
    //                 `))
    //             console.log(columns[i])
    //         }
    //     }
    //     console.log(response)
    // }, [response])

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
    }, [abrir]);

    function buttonFamily(cod, ref) {
        setAbrir(false);
        setWaitBar(true);
        let values = {}
        values.code_fam = `${cod}`
        values.refCad = `${ref}`
        api.post('/ficha/especrefcad', values, headers)
            .then(function (dat) {
                setFf(dat.data)
                setAbrir(true)
                setWaitBar(false)
            })
            .catch(function (err) {
                // console.log(err)
                alert("Erro no envio da informação!")
                window.location.href = "/search";
            })
        return ff
        // setAbrir(true)
        // setCodFam(cod)
        // setRefCad(ref)
        // console.log(codFam, refCad, abrir)
        // return (
        //     <Button
        //         title="Ver"
        //         alt="Ver"
        //         variant="contained"
        //         color="primary"
        //         type="button"
        //         size="small">
        //         {codFam}
        //     </Button>)
    }
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
    return (
        <div className={style.mainContainer}>
            <MenuAdmin view={"Pesquisa livre"} />
            <div className={style.listContainer}>
                <div className="searchBar">
                    <form onSubmit={handleSubmit} method="post">
                        <h4>Coluna:</h4>
                        <select name="busca" onChange={(e) => handleChange(e)}>
                            {cabeca.map(function (nome, id) {
                                let indice = id + 1
                                indice = indice < 10 ? `0${indice}` : indice
                                return (<option key={id} value={nome.codigo} >{indice} - {nome.descricao}</option>)
                            })}
                        </select>
                        <h4>valor:</h4>
                        <input className="input" name="busca1" type="text" onChange={(e) => handleChange2(e)} placeholder="Pesquisar"></input>
                        <Button
                            title="Enviar"
                            alt="Enviar"
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            disabled={botao}
                        >
                            Enviar
                        </Button>
                        <h4>Números de resultados encontrados: {numberRows}</h4>
                        {buttonsPagination(response.length)}
                    </form>
                </div>
                {waitBar && bar()}
                <TableContainer sx={{ height: 500 }}>
                    <Table sx={{ height: "max-content" }}>
                        <thead>{showDatas().length <= 0 ? null :
                            (<tr>
                                <th>AÇÃO</th>
                                {showColumns().map((nome, index) => (
                                    <th key={index} value={index}>{nome.toUpperCase()}</th>
                                ))}
                            </tr>)}
                        </thead>

                        <tbody>
                            {showDatas().map((pessoas) => {
                                return (
                                    <tr key={pessoas.id}>
                                        <td>
                                            {/* <form onSubmit={buttonFamily} method="post"> */}
                                            <Button
                                                title="Visualizar"
                                                alt="Visualizar"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                size="small"
                                                value={pessoas.dcod_familiar_fam}
                                                name={pessoas.pref_cad}
                                                onClick={(e) => { buttonFamily(pessoas.dcod_familiar_fam, pessoas.pref_cad) }}>
                                                VER
                                            </Button>
                                            {/* </form> */}
                                        </td>
                                        <td>{pessoas.dcd_ibge}</td>
                                        <td>{pessoas.dcod_familiar_fam}</td>
                                        <td>{pessoas.ddat_cadastramento_fam}</td>
                                        <td>{pessoas.ddat_atual_fam}</td>
                                        <td>{pessoas.dcod_est_cadastral_fam}</td>
                                        <td>{pessoas.dcod_forma_coleta_fam}</td>
                                        <td>{pessoas.ddta_entrevista_fam}</td>
                                        <td>{pessoas.dnom_localidade_fam}</td>
                                        <td>{pessoas.dnom_tip_logradouro_fam}</td>
                                        <td>{pessoas.dnom_titulo_logradouro_fam}</td>
                                        <td>{pessoas.dnom_logradouro_fam}</td>
                                        <td>{pessoas.dnum_logradouro_fam}</td>
                                        <td>{pessoas.ddes_complemento_fam}</td>
                                        <td>{pessoas.ddes_complemento_adic_fam}</td>
                                        <td>{pessoas.dnum_cep_logradouro_fam}</td>
                                        <td>{pessoas.dcod_unidade_territorial_fam}</td>
                                        <td>{pessoas.dnom_unidade_territorial_fam}</td>
                                        <td>{pessoas.dtxt_referencia_local_fam}</td>
                                        <td>{pessoas.dnom_entrevistador_fam}</td>
                                        <td>{pessoas.dnum_cpf_entrevistador_fam}</td>
                                        <td>{pessoas.dvlr_renda_media_fam}</td>
                                        <td>{pessoas.dfx_rfpc}</td>
                                        <td>{pessoas.dvlr_renda_total_fam}</td>
                                        <td>{pessoas.dmarc_pbf}</td>
                                        <td>{pessoas.dqtde_meses_desat_cat}</td>
                                        <td>{pessoas.dcod_local_domic_fam}</td>
                                        <td>{pessoas.dcod_especie_domic_fam}</td>
                                        <td>{pessoas.dqtd_comodos_domic_fam}</td>
                                        <td>{pessoas.dqtd_comodos_dormitorio_fam}</td>
                                        <td>{pessoas.dcod_material_piso_fam}</td>
                                        <td>{pessoas.dcod_material_domic_fam}</td>
                                        <td>{pessoas.dcod_agua_canalizada_fam}</td>
                                        <td>{pessoas.dcod_abaste_agua_domic_fam}</td>
                                        <td>{pessoas.dcod_banheiro_domic_fam}</td>
                                        <td>{pessoas.dcod_escoa_sanitario_domic_fam}</td>
                                        <td>{pessoas.dcod_destino_lixo_domic_fam}</td>
                                        <td>{pessoas.dcod_iluminacao_domic_fam}</td>
                                        <td>{pessoas.dcod_calcamento_domic_fam}</td>
                                        <td>{pessoas.dcod_familia_indigena_fam}</td>
                                        <td>{pessoas.dcod_povo_indigena_fam}</td>
                                        <td>{pessoas.dnom_povo_indigena_fam}</td>
                                        <td>{pessoas.dcod_indigena_reside_fam}</td>
                                        <td>{pessoas.dcod_reserva_indigena_fam}</td>
                                        <td>{pessoas.dnom_reserva_indigena_fam}</td>
                                        <td>{pessoas.dind_familia_quilombola_fam}</td>
                                        <td>{pessoas.dcod_comunidade_quilombola_fam}</td>
                                        <td>{pessoas.dnom_comunidade_quilombola_fam}</td>
                                        <td>{pessoas.dqtd_pessoas_domic_fam}</td>
                                        <td>{pessoas.dqtd_familias_domic_fam}</td>
                                        <td>{pessoas.dqtd_pessoa_inter_0_17_anos_fam}</td>
                                        <td>{pessoas.dqtd_pessoa_inter_18_64_anos_fam}</td>
                                        <td>{pessoas.dqtd_pessoa_inter_65_anos_fam}</td>
                                        <td>{pessoas.dval_desp_energia_fam}</td>
                                        <td>{pessoas.dval_desp_agua_esgoto_fam}</td>
                                        <td>{pessoas.dval_desp_gas_fam}</td>
                                        <td>{pessoas.dval_desp_alimentacao_fam}</td>
                                        <td>{pessoas.dval_desp_transpor_fam}</td>
                                        <td>{pessoas.dval_desp_aluguel_fam}</td>
                                        <td>{pessoas.dval_desp_medicamentos_fam}</td>
                                        <td>{pessoas.dnom_estab_assist_saude_fam}</td>
                                        <td>{pessoas.dcod_eas_fam}</td>
                                        <td>{pessoas.dnom_centro_assist_fam}</td>
                                        <td>{pessoas.dcod_centro_assist_fam}</td>
                                        <td>{pessoas.dnum_ddd_contato_1_fam}</td>
                                        <td>{pessoas.dnum_tel_contato_1_fam}</td>
                                        <td>{pessoas.dic_tipo_contato_1_fam}</td>
                                        <td>{pessoas.dic_envo_sms_contato_1_fam}</td>
                                        <td>{pessoas.dnum_tel_contato_2_fam}</td>
                                        <td>{pessoas.dnum_ddd_contato_2_fam}</td>
                                        <td>{pessoas.dic_tipo_contato_2_fam}</td>
                                        <td>{pessoas.dic_envo_sms_contato_2_fam}</td>
                                        <td>{pessoas.dcod_cta_energ_unid_consum_fam}</td>
                                        <td>{pessoas.dind_parc_mds_fam}</td>
                                        <td>{pessoas.dref_cad}</td>
                                        <td>{pessoas.dref_pbf}</td>
                                        <td>{pessoas.pcod_familiar_fam}</td>
                                        <td>{pessoas.pcod_est_cadastral_memb}</td>
                                        <td>{pessoas.pind_trabalho_infantil_pessoa}</td>
                                        <td>{pessoas.pnom_pessoa}</td>
                                        <td>{pessoas.pnum_nis_pessoa_atual}</td>
                                        <td>{pessoas.pnom_apelido_pessoa}</td>
                                        <td>{pessoas.pcod_sexo_pessoa}</td>
                                        <td>{pessoas.pdta_nasc_pessoa}</td>
                                        <td>{pessoas.pcod_parentesco_rf_pessoa}</td>
                                        <td>{pessoas.pcod_raca_cor_pessoa}</td>
                                        <td>{pessoas.pnom_completo_mae_pessoa}</td>
                                        <td>{pessoas.pnom_completo_pai_pessoa}</td>
                                        <td>{pessoas.pcod_local_nascimento_pessoa}</td>
                                        <td>{pessoas.psig_uf_munic_nasc_pessoa}</td>
                                        <td>{pessoas.pnom_ibge_munic_nasc_pessoa}</td>
                                        <td>{pessoas.pcod_ibge_munic_nasc_pessoa}</td>
                                        <td>{pessoas.pnom_pais_origem_pessoa}</td>
                                        <td>{pessoas.pcod_pais_origem_pessoa}</td>
                                        <td>{pessoas.pcod_certidao_registrada_pessoa}</td>
                                        <td>{pessoas.pfx_idade}</td>
                                        <td>{pessoas.pmarc_pbf}</td>
                                        <td>{pessoas.pcod_certidao_civil_pessoa}</td>
                                        <td>{pessoas.pcod_livro_termo_certid_pessoa}</td>
                                        <td>{pessoas.pcod_folha_termo_certid_pessoa}</td>
                                        <td>{pessoas.pcod_termo_matricula_certid_pessoa}</td>
                                        <td>{pessoas.pnom_munic_certid_pessoa}</td>
                                        <td>{pessoas.pcod_ibge_munic_certid_pessoa}</td>
                                        <td>{pessoas.pcod_cartorio_certid_pessoa}</td>
                                        <td>{pessoas.pnum_cpf_pessoa}</td>
                                        <td>{pessoas.pnum_identidade_pessoa}</td>
                                        <td>{pessoas.pcod_complemento_pessoa}</td>
                                        <td>{pessoas.pdta_emissao_ident_pessoa}</td>
                                        <td>{pessoas.psig_uf_ident_pessoa}</td>
                                        <td>{pessoas.psig_orgao_emissor_pessoa}</td>
                                        <td>{pessoas.pnum_cart_trab_prev_soc_pessoa}</td>
                                        <td>{pessoas.pnum_serie_trab_prev_soc_pessoa}</td>
                                        <td>{pessoas.pdta_emissao_cart_trab_pessoa}</td>
                                        <td>{pessoas.psig_uf_cart_trab_pessoa}</td>
                                        <td>{pessoas.pnum_titulo_eleitor_pessoa}</td>
                                        <td>{pessoas.pnum_zona_tit_eleitor_pessoa}</td>
                                        <td>{pessoas.pnum_secao_tit_eleitor_pessoa}</td>
                                        <td>{pessoas.pcod_deficiencia_memb}</td>
                                        <td>{pessoas.pind_def_cegueira_memb}</td>
                                        <td>{pessoas.pind_def_baixa_visao_memb}</td>
                                        <td>{pessoas.pind_def_surdez_profunda_memb}</td>
                                        <td>{pessoas.pind_def_surdez_leve_memb}</td>
                                        <td>{pessoas.pind_def_fisica_memb}</td>
                                        <td>{pessoas.pind_def_mental_memb}</td>
                                        <td>{pessoas.pind_def_sindrome_down_memb}</td>
                                        <td>{pessoas.pind_def_transtorno_mental_memb}</td>
                                        <td>{pessoas.pind_ajuda_nao_memb}</td>
                                        <td>{pessoas.pind_ajuda_familia_memb}</td>
                                        <td>{pessoas.pind_ajuda_especializado_memb}</td>
                                        <td>{pessoas.pind_ajuda_vizinho_memb}</td>
                                        <td>{pessoas.pind_ajuda_instituicao_memb}</td>
                                        <td>{pessoas.pind_ajuda_outra_memb}</td>
                                        <td>{pessoas.pcod_sabe_ler_escrever_memb}</td>
                                        <td>{pessoas.pind_frequenta_escola_memb}</td>
                                        <td>{pessoas.pnom_escola_memb}</td>
                                        <td>{pessoas.pcod_escola_local_memb}</td>
                                        <td>{pessoas.psig_uf_escola_memb}</td>
                                        <td>{pessoas.pnom_munic_escola_memb}</td>
                                        <td>{pessoas.pcod_ibge_munic_escola_memb}</td>
                                        <td>{pessoas.pcod_censo_inep_memb}</td>
                                        <td>{pessoas.pcod_curso_frequenta_memb}</td>
                                        <td>{pessoas.pcod_ano_serie_frequenta_memb}</td>
                                        <td>{pessoas.pcod_curso_frequentou_pessoa_memb}</td>
                                        <td>{pessoas.pcod_ano_serie_frequentou_memb}</td>
                                        <td>{pessoas.pcod_concluiu_frequentou_memb}</td>
                                        <td>{pessoas.pgrau_instrucao}</td>
                                        <td>{pessoas.pcod_trabalhou_memb}</td>
                                        <td>{pessoas.pcod_afastado_trab_memb}</td>
                                        <td>{pessoas.pcod_agricultura_trab_memb}</td>
                                        <td>{pessoas.pcod_principal_trab_memb}</td>
                                        <td>{pessoas.pval_remuner_emprego_memb}</td>
                                        <td>{pessoas.pcod_trabalho_12_meses_memb}</td>
                                        <td>{pessoas.pqtd_meses_12_meses_memb}</td>
                                        <td>{pessoas.pval_renda_bruta_12_meses_memb}</td>
                                        <td>{pessoas.pval_renda_doacao_memb}</td>
                                        <td>{pessoas.pval_renda_aposent_memb}</td>
                                        <td>{pessoas.pval_renda_seguro_desemp_memb}</td>
                                        <td>{pessoas.pval_renda_pensao_alimen_memb}</td>
                                        <td>{pessoas.pval_outras_rendas_memb}</td>
                                        <td>{pessoas.pmarc_sit_rua}</td>
                                        <td>{pessoas.pind_dormir_rua_memb}</td>
                                        <td>{pessoas.pqtd_dormir_freq_rua_memb}</td>
                                        <td>{pessoas.pind_dormir_albergue_memb}</td>
                                        <td>{pessoas.pqtd_dormir_freq_albergue_memb}</td>
                                        <td>{pessoas.pind_dormir_dom_part_memb}</td>
                                        <td>{pessoas.pqtd_dormir_freq_dom_part_memb}</td>
                                        <td>{pessoas.pind_outro_memb}</td>
                                        <td>{pessoas.pqtd_freq_outro_memb}</td>
                                        <td>{pessoas.pcod_tempo_rua_memb}</td>
                                        <td>{pessoas.pind_motivo_perda_memb}</td>
                                        <td>{pessoas.pind_motivo_ameaca_memb}</td>
                                        <td>{pessoas.pind_motivo_probs_fam_memb}</td>
                                        <td>{pessoas.pind_motivo_alcool_memb}</td>
                                        <td>{pessoas.pind_motivo_desemprego_memb}</td>
                                        <td>{pessoas.pind_motivo_trabalho_memb}</td>
                                        <td>{pessoas.pind_motivo_saude_memb}</td>
                                        <td>{pessoas.pind_motivo_pref_memb}</td>
                                        <td>{pessoas.pind_motivo_outro_memb}</td>
                                        <td>{pessoas.pind_motivo_nao_sabe_memb}</td>
                                        <td>{pessoas.pind_motivo_nao_resp_memb}</td>
                                        <td>{pessoas.pcod_tempo_cidade_memb}</td>
                                        <td>{pessoas.pcod_vive_fam_rua_memb}</td>
                                        <td>{pessoas.pcod_contato_parente_memb}</td>
                                        <td>{pessoas.pind_ativ_com_escola_memb}</td>
                                        <td>{pessoas.pind_ativ_com_coop_memb}</td>
                                        <td>{pessoas.pind_ativ_com_mov_soc_memb}</td>
                                        <td>{pessoas.pind_ativ_com_nao_sabe_memb}</td>
                                        <td>{pessoas.pind_ativ_com_nao_resp_memb}</td>
                                        <td>{pessoas.pind_atend_cras_memb}</td>
                                        <td>{pessoas.pind_atend_creas_memb}</td>
                                        <td>{pessoas.pind_atend_centro_ref_rua_memb}</td>
                                        <td>{pessoas.pind_atend_inst_gov_memb}</td>
                                        <td>{pessoas.pind_atend_inst_nao_gov_memb}</td>
                                        <td>{pessoas.pind_atend_hospital_geral_memb}</td>
                                        <td>{pessoas.pcod_cart_assinada_memb}</td>
                                        <td>{pessoas.pind_dinh_const_memb}</td>
                                        <td>{pessoas.pind_dinh_flanelhinha_memb}</td>
                                        <td>{pessoas.pind_dinh_carregador_memb}</td>
                                        <td>{pessoas.pind_dinh_catador_memb}</td>
                                        <td>{pessoas.pind_dinh_servs_gerais_memb}</td>
                                        <td>{pessoas.pind_dinh_pede_memb}</td>
                                        <td>{pessoas.pind_dinh_vendas_memb}</td>
                                        <td>{pessoas.pind_dinh_outro_memb}</td>
                                        <td>{pessoas.pind_dinh_nao_resp_memb}</td>
                                        <td>{pessoas.pind_atend_nenhum_memb}</td>
                                        <td>{pessoas.pref_cad}</td>
                                        <td>{pessoas.pref_pb}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </TableContainer>
                {abrir && <Modal cod={ff} openner={abrir} />}
                <Footer />
            </div>
        </div>
    );
}
export default Dashboard;