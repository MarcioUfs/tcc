import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
function listPdf(dados, pessoa) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = String(data.getSeconds() + 1).padStart(2, '0');
    let horaAtual = hora + ':' + minuto + ':' + segundo
    let dataAtual = dia + '/' + mes + '/' + ano + ' as ' + horaAtual;
    const reportTitle = [
        {
            text: 'FOLHA RESUMO CADASTRO ÚNICO',
            fontSize: 15,
            bold: true,
            margin: [0, 20, 0, 0],
            alignment: 'center'
        }
    ];
    const dadosPessoais = pessoa.map((pess) => {
        return [
            { text: pess.parentesco, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: pess.nome, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: pess.aniversario, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: pess.nis, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: pess.cpf, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: pess.deficiente, fontSize: 9, margin: [0, 2, 0, 2] },
        ]
    })
    // const dadosFamilia = dados.map((dad)=>{
    //     return [
    //         { text: dad, fontSize: 9, margin: [0, 2, 0, 2] },
    //     ]
    // })
    const details = [
        { text: `I - INFORMAÇÕES RELATIVAS AO CADASTRO DA FAMÍLIA`, fontSize: 14, margin: [0, 2, 0, 2], bold: true },
        { text: `Codigo familiar: ${dados['codigo familiar']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `Última atualização: ${dados['atualização']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `Renda percapta: ${dados['renda percapta']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `II - ENDEREÇO DA FAMÍLIA`, fontSize: 14, margin: [0, 2, 0, 2], bold: true },
        { text: `Logradouro: ${dados['logradouro']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `Cep: ${dados['cep']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `Referência para localização: ${dados['referencia']}`, fontSize: 11, margin: [0, 2, 0, 2] },
        { text: `III - COMPONENTES DA FAMÍLIA`, fontSize: 14, margin: [0, 2, 0, 2], bold: true },
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [[
                    { text: 'PARENTESCO', fontSize: 10 },
                    { text: 'NOME', fontSize: 10 },
                    { text: 'DATA DE NASCIMENTO', fontSize: 10 },
                    { text: 'NIS', fontSize: 10 },
                    { text: 'CPF', fontSize: 10 },
                    { text: 'DEFICIENTE', fontSize: 10 },
                ],
                ...dadosPessoais
                ]
            },
            layout: 'lightHorizontalLines' //lightHorizontalLines headerLineOnly
        }
    ];
    function Rodape(currentPage, pageCount) {

        return [
            {
                text: `${dataAtual}`,
                fontSize: 7,
                alignment: 'center'
            },
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    };
    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Rodape,
    }
    pdfMake.createPdf(docDefinitions).download();
}

export default listPdf;