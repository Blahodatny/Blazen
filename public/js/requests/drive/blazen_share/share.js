export default async function share(itemId, username) {
    return require('axios').get(`/drive/share?value=${itemId}&username=${username}`);
}