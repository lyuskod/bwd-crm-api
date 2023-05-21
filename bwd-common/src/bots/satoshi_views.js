import axios from 'axios'
import sleep from './sleep.js'

const viewsPerLinkRequire = 47
const timeBetweenViewsInMS = 0.5 * 1000
const bwdPapiUrl = `https://api.buywalletdat.com/api/getAllWallets`
const solWallCrackSatoshiLink = 'https://satoshi-box.com/pay/CIRpdZ'

axios
    .get(bwdPapiUrl)
    .then(async (res) => {
        const walletsArray = res.data
        for (let index = 0; index < walletsArray.length; index++) {
            let satoshiLink = walletsArray[index].Satoshi
            if (satoshiLink) {
                for (
                    let viewsIndex = 0;
                    viewsIndex < viewsPerLinkRequire;
                    viewsIndex++
                ) {
                    await sleep(timeBetweenViewsInMS)
                    await axios.get(satoshiLink)
                    console.log(
                        `Satoshi link: ${satoshiLink}\n Views: ${
                            viewsIndex + 1
                        }`
                    )
                }
            }
        }
    })
    .catch((error) => {
        console.log(error)
        throw error
    })

for (let index = 0; index < viewsPerLinkRequire; index++) {
    axios.get(solWallCrackSatoshiLink)
    console.log(
        `Satoshi link: ${solWallCrackSatoshiLink}\n Views: ${index + 1}`
    )
    await sleep(timeBetweenViewsInMS)
}
