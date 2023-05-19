const iapi_url = 'http://localhost:5050'
export const routes = {
  getAllPublicWallets: `${iapi_url}/api/getAllWallets`,
  getAllProvidedWallets: `${iapi_url}/api/getAllProvidedWallets`,
  getPublicWalletById: `${iapi_url}/api/getWalletById/`,
  getProviderWalletById: `${iapi_url}/api/getProviderWalletById/`,
  publishPublicWallet: `${iapi_url}/api/publishWallet`,
  publishProviderWallet: `${iapi_url}/api/publishProviderWallet`,
  updatePublishWalletById: `${iapi_url}/api/updateWalletById/`,
  updateProvidedWalletById: `${iapi_url}/api/updateProviderWalletById/`,
  removePublicWalletById: `${iapi_url}/api/removeWalletById/`,
  removeProviderWalletById: `${iapi_url}/api/removeProviderWalletById/`,
}
