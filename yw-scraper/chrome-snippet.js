const media = __REDUX_STATE__.app.data.media;

const mediaJSON = JSON.stringify(media, null, 4);

const tempElem = document.createElement('textarea');
tempElem.value = mediaJSON;
document.body.appendChild(tempElem);
tempElem.select();
document.execCommand('copy');
document.body.removeChild(tempElem);

console.log("Media array has been copied to clipboard.");