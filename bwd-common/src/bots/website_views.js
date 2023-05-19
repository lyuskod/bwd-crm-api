import axios from 'axios'
import sleep from './sleep.js'

const timeBetweenViewsInMS = 0.5 * 1000
const views_needed = 10_000
const websiteUrl = 'https://buywalletdat.com'
for (let counter = 0; counter < views_needed; counter++) {
    axios.get(websiteUrl)
    await sleep(timeBetweenViewsInMS)
    console.log('Done website views: ' + counter)
}