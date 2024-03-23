export default function maskMoney(mon, refcad) {
    // console.log(refcad.split('-'))
    let resultData = ''
    let mone = ''
    if (refcad) {
        resultData = refcad.split('-')
        resultData = resultData[0]
        if (resultData <= 2021) {
            if (mon !== '') {
                mone = `R$ ${mon},00`
            } 
            if (mon == 0) {
                mone = `R$ 0,00`
            }
            return mone
        }
        if (resultData >= 2022) {
            if (mon !== '' || mon !== 0) {
                mon = mon.slice(0, -2)
                mone = `R$ ${mon},00`
            }
            if (mon == 0) {
                mone = `R$ 0,00`
            }
        }
    }
    return mone
}