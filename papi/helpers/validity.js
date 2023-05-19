import fs from 'fs'
import { getWalletAddress } from '../scripts/getWalletAddress.js'

export default class ValidityHelper {
    static #audit = {
        check_1: {
            name: 'XingFeng',
            success_message: 'PASSED',
            fail_message: 'FAILED (Wallet.dat content was changed)',
            found: null,
        },
        check_2: {
            name: 'Address',
            success_message: 'PASSED',
            fail_message:
                'FAILED (No wallet address found in wallet.dat content)',
            found: null,
        },
        check_3: {
            name: 'RequiredContent',
            success_message: 'PASSED',
            fail_message:
                'FAILED (Some of the required content not found inside wallet.dat)',
            found: null,
        },
    }

    static getValidity(filepath) {
        const file = fs.readFileSync(filepath)

        this.#audit.check_1.found = this.#check_1_containsXingFeng(file)
        this.#audit.check_2.found = this.#check_2_addressPresent(file)
        this.#audit.check_3.found =
            this.#check_3_correspondingSymbolsPresent(file)
        return this.#generateData(this.#audit, filepath)
    }

    static #generateData(audit, filepath) {
        const result = {}
        const keys = Object.keys(audit)
        keys.forEach((key) => {
            result[audit[key].name] = audit[key].found
                ? audit[key].fail_message
                : audit[key].success_message
        })
        const checksPerformed = keys.length
        const checksPassed = keys.filter(
            (key) => audit[key].found === false
        ).length
        const checksFailed = keys.filter(
            (key) => audit[key].found === true
        ).length
        const validity = (checksPassed * 99) / checksPerformed
        result['checksPerformed'] = checksPerformed
        result['checksPassed'] = checksPassed
        result['checksFailed'] = checksFailed
        result['validity'] = validity
        result['address'] = getWalletAddress(filepath)
        return result
    }

    static #check_1_containsXingFeng(file) {
        const filecontent = file.toString()
        return filecontent.includes('xingfeng')
    }

    static #check_2_addressPresent(file) {
        const filecontent = file.toString()
        return !filecontent
            .match(/name"\w+/)[0]
            .replace('name"', '')
            .trim()
    }

    static #check_3_correspondingSymbolsPresent(file) {
        const filecontent = file.toString()
        return !(filecontent.includes('ckey!') && filecontent.includes('name"'))
    }
}
