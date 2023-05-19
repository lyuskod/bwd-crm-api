import fs from 'fs'

export const getWalletAddress = (filepathToWalletDat) => {
    const content = fs.readFileSync(filepathToWalletDat).toString()
    return content
        .match(/name"\w+/)[0]
        .replace('name"', '')
        .trim()
}
