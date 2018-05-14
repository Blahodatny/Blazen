export default async function getFolderChildren(folderId) {
    return require('axios').get(`/drive/getFolderChildren?value=${folderId}`);
}