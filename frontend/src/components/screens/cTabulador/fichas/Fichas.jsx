import React, { useState, useContext } from "react";
import { Context } from '../../../Context/DataContext';
import maskData from '../../../functions/maskData';
import maskMoney from "../../../functions/maskMoney";
import maskCpf from '../../../functions/maskCpf';
import useStyles from '../makeTabulador';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import gerarFolhaPdf from './geraPdf'

const FichaModal = props => {
    const [fix, setFix] = useState(props.fich)
    const [open, setOpen] = useState(props.abr);
    const handleClose = () => setOpen(false);
    const { munic, parent } = useContext(Context)
    const style = useStyles();

    const folha = () => {
        let objDados = {}
        let objPessoas = []
        let responsavel = []
        function munFilter(codIbge) {
            for (let filtro of munic) {
                if (filtro.codigo_municipio_completo === codIbge) {
                    return ((filtro.nome_municipio).toUpperCase())
                }
            }
        }
        responsavel = fix.filter((fic) => (fic.pcod_parentesco_rf_pessoa === '1'))

        if (responsavel.length <= 0) {
            responsavel = fix.filter((fic) => (fic.pcod_parentesco_rf_pessoa === ''))
        }

        let componentesFamiliares = fix.map((fic, index) => {
            let deficiencia = fic.pcod_deficiencia_memb || 'Dado não encontrado'
            if (deficiencia === '1') {
                deficiencia = "SIM"
            } else if (deficiencia === '2') {
                deficiencia = "NÃO"
            } else {
                deficiencia = "NÃO INFORMADO"
            }
            let para = parent.filter((filtro) => (filtro.codigo === fic.pcod_parentesco_rf_pessoa))
            let saidaAniv = maskData(fic.pdta_nasc_pessoa)
            let pessoa = `${fic.pnom_pessoa}, NASC ${saidaAniv}, NIS ${fic.pnum_nis_pessoa_atual}, CPF ${maskCpf(fic.pnum_cpf_pessoa)}, DEFICIENTE ${deficiencia}`
            objPessoas.push(JSON.parse(`{
                "nome":"${fic.pnom_pessoa}",
                "aniversario":"${saidaAniv}",
                "nis":"${fic.pnum_nis_pessoa_atual}",
                "cpf":"${maskCpf(fic.pnum_cpf_pessoa)}",
                "deficiente":"${deficiencia}",
                "parentesco":"${para[0].descricao === '' ? "SEM IMFORMAÇÃO" : (para[0].descricao).toUpperCase()}"
            }`))
            if (fic.pcod_parentesco_rf_pessoa === '') {
                return (<TextField key={index} className={style.textFieldFicha} label="SEM IMFORMAÇÃO" variant="outlined" value={pessoa} size="small" readyonly multiline="true" />)
            } else {
                return (<TextField key={index} className={style.textFieldFicha} label={(para[0].descricao).toUpperCase()} variant="outlined" value={pessoa} size="small" readyonly />)
            }
        })
        let bairro = (responsavel[0].dnom_localidade_fam) ? (`- ${responsavel[0].dnom_localidade_fam}`) : ''
        let numeroCasa = isNaN(parseInt(responsavel[0].dnum_logradouro_fam)) ? 'S/N' : (`${parseInt(responsavel[0].dnum_logradouro_fam)} ${bairro}`)
        let complementoNumero = responsavel[0].ddes_complemento_fam !== '' ? responsavel[0].ddes_complemento_fam : ''
        let cidade = munFilter(responsavel[0].dcd_ibge)
        let saidaData = maskData(responsavel[0].ddat_atual_fam)
        let saidaMoney = maskMoney(responsavel[0].dvlr_renda_media_fam, responsavel[0].pref_cad)
        let logradouro = (`${responsavel[0].dnom_tip_logradouro_fam} ${responsavel[0].dnom_titulo_logradouro_fam} ${responsavel[0].dnom_logradouro_fam}, ${numeroCasa} ${complementoNumero} ${cidade}`)
        let cep = responsavel[0].dnum_cep_logradouro_fam !== '' ? responsavel[0].dnum_cep_logradouro_fam : 'N/I'
        let refenciaLocalizacao = responsavel[0].dtxt_referencia_local_fam !== '' ? responsavel[0].dtxt_referencia_local_fam : 'N/I'
        objDados = JSON.parse(`{
            "codigo familiar":"${responsavel[0].dcod_familiar_fam}",
            "atualização":"${saidaData}",
            "renda percapta":"${saidaMoney}",
            "logradouro":"${logradouro}",
            "cep":"${cep}",
            "referencia":"${refenciaLocalizacao}"
        }`)
        //S61lhZZO
        return (
            <TableContainer sx={{ height: 630 }}>
                <Table sx={{ height: "max-content" }}>
                    <Typography className={style.textFieldFicha}>FOLHA RESUMO CADASTRO ÚNICO</Typography>
                    <Typography className={style.textFieldFicha}>I - INFORMAÇÕES RELATIVAS AO CADASTRO DA FAMÍLIA</Typography>
                    <TextField className={style.textFieldFicha} label="CÓDIGO FAMILIAR" variant="outlined" value={responsavel[0].dcod_familiar_fam} size="small" readyonly />
                    <TextField className={style.textFieldFicha} label="ÚLTIMA ATUALIZÇÃO FAMILIAR EM" variant="outlined" value={saidaData} size="small" readyonly />
                    <TextField className={style.textFieldFicha} label="RENDA PER CAPITA DA FAMÍLIA" variant="outlined" value={saidaMoney} size="small" readyonly />
                    <Typography className={style.textFieldFicha}>II - ENDEREÇO DA FAMÍLIA</Typography>
                    <TextField className={style.textFieldFicha} label="LOGRADOURO" variant="outlined" value={logradouro} size="small" readyonly />
                    <TextField className={style.textFieldFicha} label="CEP" variant="outlined" value={cep} size="small" readyonly />
                    <TextField className={style.textFieldFicha} label="REFERÊNCIA PARA LOCALIZAÇÃO" variant="outlined" value={refenciaLocalizacao} size="small" readyonly />
                    <Typography className={style.textFieldFicha}>III - COMPONENTES DA FAMÍLIA</Typography>
                    {componentesFamiliares}
                </Table>
                <Button
                    // type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e) => { gerarFolhaPdf(objDados,objPessoas) }}
                >
                    pdf
                </Button>
            </TableContainer>
        )

    }
    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className={style.boxFicha}>
                    <Typography id="modal-modal-description" className={style.typoFicha}>
                        {folha()}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default FichaModal;