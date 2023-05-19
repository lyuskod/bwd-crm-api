export default class SQLs {
    static getAllWallets(table) {
        return `SELECT * FROM ${table};`
    }

    static getWalletByAddress(table, address) {
        return `SELECT * FROM ${table} WHERE Address = '${address}';`
    }
}
