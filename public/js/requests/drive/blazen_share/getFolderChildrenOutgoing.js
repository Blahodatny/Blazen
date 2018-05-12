export default async function getFolderChildrenOutgoing(itemId) {
    return require('axios').get(`/drive/getFolderChildrenOutgoing?value=${itemId}`);
}