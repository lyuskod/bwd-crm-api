import { execSync } from 'child_process';

export const getWalletHash = (filepath) => {
    return execSync(`python3 scripts/bitcoin2john.py ${filepath}`, {
        encoding: 'utf-8',
    })
        .replace(/\r?\n|\r/, '')
        .trim()
}
