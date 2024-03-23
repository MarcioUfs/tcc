export default function maskCpf(entrada) {
    let replaceCpf = ''
    let cpfFinal = ''
    if (entrada) {
        replaceCpf = entrada.replace(/\D/g, '')
        if (replaceCpf.length === 11) {
            cpfFinal = replaceCpf
        } else if (replaceCpf.length > 11) {
            cpfFinal = '00000000000'
        } else {
            let diferencaTam = replaceCpf.length
            for (let i = diferencaTam; i < 11; i++) {
                replaceCpf = `0${replaceCpf}`;
            }
            cpfFinal = replaceCpf
        }

        cpfFinal = cpfFinal.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');

        return cpfFinal
    } else {
        cpfFinal = '000.000.000-00'
        return cpfFinal
    }
}