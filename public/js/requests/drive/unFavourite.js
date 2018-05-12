export default async function unFavourite(itemId) {
    return require('axios').get(`/drive/unFavourite?value=${itemId}`);
}