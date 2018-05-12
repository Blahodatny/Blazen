export default async function unShare(itemId, username) {
    return require('axios').get(`/drive/unShare?value=${itemId}&username=${username}`);
}