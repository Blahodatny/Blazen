export default async function restoreItem(itemId) {
    return require('axios').get(`/drive/restoreItem?value=${itemId}`);
}