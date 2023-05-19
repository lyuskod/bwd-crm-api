export default class ProvidedWalletsSQLs {
  static getAllProvidedWallets(table) {
    return `SELECT * FROM ${table};`
  }

  static getProviderWalletById(table, id) {
    return `SELECT * FROM ${table} WHERE id = ${id};`
  }

  static getProvidedWalletByAddress(table, address) {
    return `SELECT * FROM ${table} WHERE Address = '${address}';`
  }

  static publishProvidedWallet(
    table,
    address,
    priceInDollars,
    satoshiWallet,
    providerWallet,
    providerContact
  ) {
    return `INSERT ${table}(Address, PriceInDollars, SatoshiWallet, ProviderWallet, ProviderContact) VALUES ('${address}', ${priceInDollars}, '${satoshiWallet}', '${providerWallet}', '${providerContact}');`
  }

  static removeProviderWalletByAddress(table, address) {
    return `DELETE FROM ${table} WHERE Address = '${address}';`
  }

  static removeProviderWalletById(table, id) {
    return `DELETE FROM ${table} WHERE id = ${id};`
  }

  static updateProvidedWalletByAddress(
    table,
    address_from_params,
    address,
    priceInDollars,
    satoshiWallet,
    providerWallet,
    providerContact
  ) {
    return `UPDATE ${table} SET Address = '${address}', PriceInDollars = ${priceInDollars}, SatoshiWallet = '${satoshiWallet}', ProviderWallet = '${providerWallet}', ProviderContact = '${providerContact}' WHERE Address = '${address_from_params}'`
  }

  static updateProvidedWalletById(
    table,
    id,
    address,
    priceInDollars,
    satoshiWallet,
    providerWallet,
    providerContact
  ) {
    return `UPDATE ${table} SET Address = '${address}', PriceInDollars = ${priceInDollars}, SatoshiWallet = '${satoshiWallet}', ProviderWallet = '${providerWallet}', ProviderContact = '${providerContact}' WHERE id = ${id}`
  }
}
