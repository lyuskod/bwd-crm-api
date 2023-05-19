import dotenv from 'dotenv'
import axios from 'axios'
import { sleep } from './sleep.js'
import fs from 'fs'
dotenv.config()

const bwdPapiUrl = `${process.env.bwd_papi_url}/api/publishWallet`
const walletsArray = JSON.parse(fs.readFileSync('wallets.json')).wallets

walletsArray.forEach(async (wallet) => {
    await axios.post(bwdPapiUrl, {
        Address: wallet.address,
        Balance: +wallet.balance,
        Hints: wallet.hints,
        Package: wallet.package,
        Comments: wallet.comments,
        Satoshi: wallet.satoshi,
    })
    console.log(`Wallet adder: Added wallet #${wallet.address}`)
    await sleep(500)
})
