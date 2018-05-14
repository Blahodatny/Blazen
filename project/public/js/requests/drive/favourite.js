export default async function favourite(itemId) {
    return require('axios').get(`/drive/favourite?value=${itemId}`);
}