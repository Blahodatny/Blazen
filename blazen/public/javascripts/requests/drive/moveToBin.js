export default async function moveToBin(itemId, username='') {
    return require('axios').delete(`/drive/moveToBin?value=${itemId}&username=${username}`);
}