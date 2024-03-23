export default function maskData(dat) {
    let splitData = ''
    let retornoData = ''
    if (dat) {
        splitData = dat.split('-')
        retornoData = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
    } 
    return retornoData;
}