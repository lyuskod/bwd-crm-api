import fs from 'fs'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import bip39 from 'bip39'
import { binary_to_base58 } from 'base58-js'
import * as ed25519 from 'ed25519-hd-key'
import { sleep } from './sleep.js'

const phrases = JSON.parse(fs.readFileSync('./bip39phrases.json')).phrases
const phrasesLength = phrases.length
const network = 'mainnet-beta'
const connection = new Connection(clusterApiUrl(network))

function getPhrase() {
  const arr = []
  for (let index = 0; index < 12; index++) {
    arr.push(phrases[Math.floor(Math.random() * phrasesLength)].trim())
  }
  return arr.join(' ')
}

function writeToFile(pubKey, privKey, balance, seed) {
  const path = './wallets.json'
  const file = JSON.parse(fs.readFileSync(path))
  file.wallets.push({ pubKey, privKey, balance, seed })
  fs.writeFileSync(path, JSON.stringify(file))
}

function createFoundFile() {
  fs.writeFileSync('./_____FOUND_____.txt', '')
}

const derivePath = "m/44'/501'/0'/0'"
while (true) {
  const mnemonic = getPhrase()
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const derivedSeed = ed25519.derivePath(derivePath, seed.toString('hex')).key
  const keypair = Keypair.fromSeed(derivedSeed)
  const publicKey = keypair.publicKey.toBase58()
  const privateKey = binary_to_base58(keypair.secretKey)
  const balance = (await connection.getBalance(keypair.publicKey)) /
  LAMPORTS_PER_SOL
  const template = `\n\nTrying Address: ${publicKey}\nBalance: ${balance}\nPrivate Key: ${privateKey}\nMnemonic: ${mnemonic}\n\n`
  console.log(template)
  if (balance) {
    console.log('FOUND!')
    createFoundFile()
    writeToFile(publicKey, privateKey, balance, seed)
  }
  await sleep(200)
}
