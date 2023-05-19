export default class SQLs {
    static getAllWallets(table) {
        return `SELECT * FROM ${table};`
    }

    static publishWallet(
        table,
        address,
        balance,
        hints,
        packages,
        comments,
        satoshi,
        screenshot
    ) {
        return `INSERT ${table}(Address, Balance, Hints, Package, Comments, Satoshi, Screenshot) VALUES ('${address}', ${balance}, '${hints}', '${packages}', '${comments}', '${satoshi}', '${screenshot}');`
    }

    static removeWalletById(table, id) {
        return `DELETE FROM ${table} WHERE id = ${id};`
    }

    static removeWalletByAddress(table, address) {
        return `DELETE FROM ${table} WHERE Address = '${address}';`
    }

    static getWalletById(table, id) {
        return `SELECT * FROM ${table} WHERE id = ${id};`
    }

    static getWalletByAddress(table, address) {
        return `SELECT * FROM ${table} WHERE Address = '${address}';`
    }

    static updateWalletById(
        table,
        id,
        address,
        balance,
        hints,
        packages,
        comments,
        satoshi,
        screenshot
    ) {
        return `UPDATE ${table} SET Address = '${address}', Balance = ${balance}, Hints = '${hints}', Package = '${packages}', Comments = '${comments}', Satoshi = '${satoshi}', Screenshot = '${screenshot}' WHERE id = ${id}`
    }

    static updateWalletByAddress(
        table,
        address_from_params,
        address,
        balance,
        hints,
        packages,
        comments,
        satoshi,
        screenshot
    ) {
        return `UPDATE ${table} SET Address = '${address}', Balance = ${balance}, Hints = '${hints}', Package = '${packages}', Comments = '${comments}', Satoshi = '${satoshi}', Screenshot = '${screenshot}' WHERE Address = '${address_from_params}'`
    }
}
