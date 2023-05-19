import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import cors from 'cors'
import { routes } from './api/routes.js'
import PublicWalletsSQLs from './api/public-wallets-sqls.js'
import ProvidedWalletsSQLs from './api/provided-wallets-sql.js'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import multer from 'multer'
dotenv.config()

const db = mysql.createPool({
  host: process.env.bwd_db_host,
  user: process.env.bwd_db_user,
  password: process.env.bwd_db_password,
  database: process.env.bwd_db_database,
})
const public_wallets_table = process.env.bwd_db_table
const provided_wallets_table = process.env.bwd_db_provided_wallets_table

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'wallets')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.dat`)
  },
})

const upload = multer({ storage }).single('file')

app.get(routes.getAllPublicWallets, (req, res) => {
  const sqlGet = PublicWalletsSQLs.getAllWallets(public_wallets_table)
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.get(routes.getAllProvidedWallets, (req, res) => {
  const sqlGet = ProvidedWalletsSQLs.getAllProvidedWallets(
    provided_wallets_table
  )
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.post(routes.publishPublicWallet, (req, res) => {
  const { Address, Balance, Hints, Package, Comments, Satoshi, Screenshot } =
    req.body
  const sqlInsert = PublicWalletsSQLs.publishWallet(
    public_wallets_table,
    Address,
    Balance,
    Hints,
    Package,
    Comments,
    Satoshi,
    Screenshot
  )
  db.query(sqlInsert, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.post(routes.publishProviderWallet, (req, res) => {
  const {
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact,
  } = req.body
  const sqlInsert = ProvidedWalletsSQLs.publishProvidedWallet(
    provided_wallets_table,
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact
  )
  db.query(sqlInsert, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.delete(routes.removePublicWalletById, (req, res) => {
  const { id } = req.params
  const sqlRemove = PublicWalletsSQLs.removeWalletById(public_wallets_table, id)
  db.query(sqlRemove, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.delete(routes.removeProviderWalletById, (req, res) => {
  const { id } = req.params
  const sqlRemove = ProvidedWalletsSQLs.removeProviderWalletById(
    provided_wallets_table,
    id
  )
  db.query(sqlRemove, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.delete(routes.removePublicWalletByAddress, (req, res) => {
  const { address } = req.params
  const sqlRemove = PublicWalletsSQLs.removeWalletByAddress(
    public_wallets_table,
    address
  )
  db.query(sqlRemove, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.delete(routes.remoteProviderWalletByAddress, (req, res) => {
  const { address } = req.params
  const sqlRemove = ProvidedWalletsSQLs.removeProviderWalletByAddress(
    provided_wallets_table,
    address
  )
  db.query(sqlRemove, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.get(routes.getPublicWalletById, (req, res) => {
  const { id } = req.params
  const sqlGet = PublicWalletsSQLs.getWalletById(public_wallets_table, id)
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.get(routes.getProviderWalletById, (req, res) => {
  const { id } = req.params
  const sqlGet = ProvidedWalletsSQLs.getProviderWalletById(
    provided_wallets_table,
    id
  )
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.get(routes.getPublicWalletByAddress, (req, res) => {
  const { address } = req.params
  const sqlGet = PublicWalletsSQLs.getWalletByAddress(
    public_wallets_table,
    address
  )
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.get(routes.getProvidedWalletByAddress, (req, res) => {
  const { address } = req.params
  const sqlGet = ProvidedWalletsSQLs.getProvidedWalletByAddress(
    provided_wallets_table,
    address
  )
  db.query(sqlGet, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.put(routes.updatePulicWalletById, (req, res) => {
  const { id } = req.params
  const { Address, Balance, Hints, Package, Comments, Satoshi, Screenshot } =
    req.body
  const sqlUpdate = PublicWalletsSQLs.updateWalletById(
    public_wallets_table,
    id,
    Address,
    Balance,
    Hints,
    Package,
    Comments,
    Satoshi,
    Screenshot
  )
  db.query(sqlUpdate, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.put(routes.updateProviderWalletById, (req, res) => {
  const { id } = req.params
  const {
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact,
  } = req.body
  const sqlUpdate = ProvidedWalletsSQLs.updateProvidedWalletById(
    provided_wallets_table,
    id,
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact
  )
  db.query(sqlUpdate, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.put(routes.updatePulicWalletByAddress, (req, res) => {
  const { address } = req.params
  const { Address, Balance, Hints, Package, Comments, Satoshi, Screenshot } =
    req.body
  const sqlUpdate = PublicWalletsSQLs.updateWalletByAddress(
    public_wallets_table,
    address,
    Address,
    Balance,
    Hints,
    Package,
    Comments,
    Satoshi,
    Screenshot
  )
  db.query(sqlUpdate, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.put(routes.updateProviderWalletByAddress, (req, res) => {
  const { address } = req.params
  const {
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact,
  } = req.body
  const sqlUpdate = ProvidedWalletsSQLs.updateProvidedWalletByAddress(
    provided_wallets_table,
    address,
    Address,
    PriceInDollars,
    SatoshiWallet,
    ProviderWallet,
    ProviderContact
  )
  db.query(sqlUpdate, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).send(result)
  })
})

app.post(routes.getWalletHashByWallet, (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json(error)
    }
    const hash = execSync(
      `python3 scripts/bitcoin2john.py wallets/${req.file.filename}`,
      { encoding: 'utf-8' }
    )
    return res.status(200).send(hash.replace(/\r?\n|\r/, '').trim())
  })
})

app.listen(process.env.bwd_papi_port, () => {
  console.log(`Server is running on port ${process.env.bwd_papi_port}`)
})
