export default async function deleteItem(itemId) {
    return require('axios').delete(`/drive/deleteItem?value=${itemId}`);
}