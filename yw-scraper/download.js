const fs = require('fs');
const axios = require('axios');
const path = require('path');
  
const downloadImage = async (url, out) => {
    const response = await axios({ url, responseType: 'stream' });
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(out))
            .on('finish', () => {
                console.log("Image downloaded", out)
                resolve()
            })
            .on('error', (err) => {
                console.log("Image failed", url, err)
                resolve()
            });
    });
}

async function processImages() {
    const data = fs.readFileSync('media.json')
    const media = JSON.parse(data)
    // media is an array, output size
    console.log("Downloading images", media.length)
    for(let item of media) {
        if (item.url.match(/\.(jpeg|jpg|gif|png)$/)) {
            const out = path.resolve('./downloads/', path.basename(item.url))
            await downloadImage(item.url, out)
        }
    }
}

processImages().catch(console.error);
