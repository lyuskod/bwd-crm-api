import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import cors from 'cors'
import multer from 'multer'
import { routes } from './api/routes.js'
import SQLs from './api/sqls.js'
import dotenv from 'dotenv'
import fs from 'fs'
import { getWalletHash } from './scripts/getWalletHash.js'
import ValidityHelper from './helpers/validity.js'
import { getWalletAddress } from './scripts/getWalletAddress.js'
dotenv.config()

const db = mysql.createPool({
    host: process.env.bwd_db_host,
    user: process.env.bwd_db_user,
    password: process.env.bwd_db_password,
    database: process.env.bwd_db_database,
})
const table = process.env.bwd_db_table

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

app.get(routes.getAllWallets, (req, res) => {
    const sqlGet = SQLs.getAllWallets(table)
    db.query(sqlGet, (error, result) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).send(result)
    })
})

app.get(routes.getWalletByAddress, (req, res) => {
    const { address } = req.params
    const sqlGet = SQLs.getWalletByAddress(table, address)
    db.query(sqlGet, (error, result) => {
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
        const filepath = `wallets/${req.file.filename}`
        const hash = getWalletHash(filepath)
        // fs.unlinkSync(filepath)
        return res.status(200).send(hash)
    })
})

app.post(routes.getWalletValidityByWallet, (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(500).json(error)
        }
        const filepath = `wallets/${req.file.filename}`
        const audit = ValidityHelper.getValidity(filepath)
        // fs.unlinkSync(filepath)
        return res.status(200).send(audit)
    })
})

app.post(routes.getWalletAddressByWallet, (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(500).json(error)
        }
        const filepath = `wallets/${req.file.filename}`
        const address = getWalletAddress(filepath)
        // fs.unlinkSync(filepath)
        return res.status(200).send(address)
    })
})

app.listen(process.env.bwd_papi_port, () => {
    console.log(`Server is running on port ${process.env.bwd_papi_port}`)
})
