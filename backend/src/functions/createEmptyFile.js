const fs = require('fs')
const createHeader = `d.cd_ibge; d.cod_familiar_fam; d.dat_cadastramento_fam; d.dat_atual_fam; d.cod_est_cadastral_fam; d.cod_forma_coleta_fam; d.dta_entrevista_fam; d.nom_localidade_fam; d.nom_tip_logradouro_fam; d.nom_titulo_logradouro_fam; d.nom_logradouro_fam; d.num_logradouro_fam; d.des_complemento_fam; d.des_complemento_adic_fam; d.num_cep_logradouro_fam; d.cod_unidade_territorial_fam; d.nom_unidade_territorial_fam; d.txt_referencia_local_fam; d.nom_entrevistador_fam; d.num_cpf_entrevistador_fam; d.vlr_renda_media_fam; d.fx_rfpc; d.vlr_renda_total_fam; d.marc_pbf; d.qtde_meses_desat_cat; d.cod_local_domic_fam; d.cod_especie_domic_fam; d.qtd_comodos_domic_fam; d.qtd_comodos_dormitorio_fam; d.cod_material_piso_fam; d.cod_material_domic_fam; d.cod_agua_canalizada_fam; d.cod_abaste_agua_domic_fam; d.cod_banheiro_domic_fam; d.cod_escoa_sanitario_domic_fam; d.cod_destino_lixo_domic_fam; d.cod_iluminacao_domic_fam; d.cod_calcamento_domic_fam; d.cod_familia_indigena_fam; d.cod_povo_indigena_fam; d.nom_povo_indigena_fam; d.cod_indigena_reside_fam; d.cod_reserva_indigena_fam; d.nom_reserva_indigena_fam; d.ind_familia_quilombola_fam; d.cod_comunidade_quilombola_fam; d.nom_comunidade_quilombola_fam; d.qtd_pessoas_domic_fam; d.qtd_familias_domic_fam; d.qtd_pessoa_inter_0_17_anos_fam; d.qtd_pessoa_inter_18_64_anos_fam; d.qtd_pessoa_inter_65_anos_fam; d.val_desp_energia_fam; d.val_desp_agua_esgoto_fam; d.val_desp_gas_fam; d.val_desp_alimentacao_fam; d.val_desp_transpor_fam; d.val_desp_aluguel_fam; d.val_desp_medicamentos_fam; d.nom_estab_assist_saude_fam; d.cod_eas_fam; d.nom_centro_assist_fam; d.cod_centro_assist_fam; d.num_ddd_contato_1_fam; d.num_tel_contato_1_fam; d.ic_tipo_contato_1_fam; d.ic_envo_sms_contato_1_fam; d.num_tel_contato_2_fam; d.num_ddd_contato_2_fam; d.ic_tipo_contato_2_fam; d.ic_envo_sms_contato_2_fam; d.cod_cta_energ_unid_consum_fam; d.ind_parc_mds_fam; d.ref_cad; d.ref_pbf; p.cod_familiar_fam; p.cod_est_cadastral_memb; p.ind_trabalho_infantil_pessoa; p.nom_pessoa; p.num_nis_pessoa_atual; p.nom_apelido_pessoa; p.cod_sexo_pessoa; p.dta_nasc_pessoa; p.cod_parentesco_rf_pessoa; p.cod_raca_cor_pessoa; p.nom_completo_mae_pessoa; p.nom_completo_pai_pessoa; p.cod_local_nascimento_pessoa; p.sig_uf_munic_nasc_pessoa; p.nom_ibge_munic_nasc_pessoa; p.cod_ibge_munic_nasc_pessoa; p.nom_pais_origem_pessoa; p.cod_pais_origem_pessoa; p.cod_certidao_registrada_pessoa; p.fx_idade; p.marc_pbf; p.cod_certidao_civil_pessoa; p.cod_livro_termo_certid_pessoa; p.cod_folha_termo_certid_pessoa; p.cod_termo_matricula_certid_pessoa; p.nom_munic_certid_pessoa; p.cod_ibge_munic_certid_pessoa; p.cod_cartorio_certid_pessoa; p.num_cpf_pessoa; p.num_identidade_pessoa; p.cod_complemento_pessoa; p.dta_emissao_ident_pessoa; p.sig_uf_ident_pessoa; p.sig_orgao_emissor_pessoa; p.num_cart_trab_prev_soc_pessoa; p.num_serie_trab_prev_soc_pessoa; p.dta_emissao_cart_trab_pessoa; p.sig_uf_cart_trab_pessoa; p.num_titulo_eleitor_pessoa; p.num_zona_tit_eleitor_pessoa; p.num_secao_tit_eleitor_pessoa; p.cod_deficiencia_memb; p.ind_def_cegueira_memb; p.ind_def_baixa_visao_memb; p.ind_def_surdez_profunda_memb; p.ind_def_surdez_leve_memb; p.ind_def_fisica_memb; p.ind_def_mental_memb; p.ind_def_sindrome_down_memb; p.ind_def_transtorno_mental_memb; p.ind_ajuda_nao_memb; p.ind_ajuda_familia_memb; p.ind_ajuda_especializado_memb; p.ind_ajuda_vizinho_memb; p.ind_ajuda_instituicao_memb; p.ind_ajuda_outra_memb; p.cod_sabe_ler_escrever_memb; p.ind_frequenta_escola_memb; p.nom_escola_memb; p.cod_escola_local_memb; p.sig_uf_escola_memb; p.nom_munic_escola_memb; p.cod_ibge_munic_escola_memb; p.cod_censo_inep_memb; p.cod_curso_frequenta_memb; p.cod_ano_serie_frequenta_memb; p.cod_curso_frequentou_pessoa_memb; p.cod_ano_serie_frequentou_memb; p.cod_concluiu_frequentou_memb; p.grau_instrucao; p.cod_trabalhou_memb; p.cod_afastado_trab_memb; p.cod_agricultura_trab_memb; p.cod_principal_trab_memb; p.val_remuner_emprego_memb; p.cod_trabalho_12_meses_memb; p.qtd_meses_12_meses_memb; p.val_renda_bruta_12_meses_memb; p.val_renda_doacao_memb; p.val_renda_aposent_memb; p.val_renda_seguro_desemp_memb; p.val_renda_pensao_alimen_memb; p.val_outras_rendas_memb; p.marc_sit_rua; p.ind_dormir_rua_memb; p.qtd_dormir_freq_rua_memb; p.ind_dormir_albergue_memb; p.qtd_dormir_freq_albergue_memb; p.ind_dormir_dom_part_memb; p.qtd_dormir_freq_dom_part_memb; p.ind_outro_memb; p.qtd_freq_outro_memb; p.cod_tempo_rua_memb; p.ind_motivo_perda_memb; p.ind_motivo_ameaca_memb; p.ind_motivo_probs_fam_memb; p.ind_motivo_alcool_memb; p.ind_motivo_desemprego_memb; p.ind_motivo_trabalho_memb; p.ind_motivo_saude_memb; p.ind_motivo_pref_memb; p.ind_motivo_outro_memb; p.ind_motivo_nao_sabe_memb; p.ind_motivo_nao_resp_memb; p.cod_tempo_cidade_memb; p.cod_vive_fam_rua_memb; p.cod_contato_parente_memb; p.ind_ativ_com_escola_memb; p.ind_ativ_com_coop_memb; p.ind_ativ_com_mov_soc_memb; p.ind_ativ_com_nao_sabe_memb; p.ind_ativ_com_nao_resp_memb; p.ind_atend_cras_memb; p.ind_atend_creas_memb; p.ind_atend_centro_ref_rua_memb; p.ind_atend_inst_gov_memb; p.ind_atend_inst_nao_gov_memb; p.ind_atend_hospital_geral_memb; p.cod_cart_assinada_memb; p.ind_dinh_const_memb; p.ind_dinh_flanelhinha_memb; p.ind_dinh_carregador_memb; p.ind_dinh_catador_memb; p.ind_dinh_servs_gerais_memb; p.ind_dinh_pede_memb; p.ind_dinh_vendas_memb; p.ind_dinh_outro_memb; p.ind_dinh_nao_resp_memb; p.ind_atend_nenhum_memb; p.ref_cad; p.ref_pbf`;
function createEmptyFile() {
    const createEmptyFile = fs.writeFile(__dirname+"../../../uploads/"+'arquivo.csv', createHeader, function (err) {
        if (err !== null) return console.log(err);
      });
    return createEmptyFile;
}

module.exports = createEmptyFile;