export default async function getFolderChildrenIncoming(folderId, username) {
    return require('axios').get(`/drive/getFolderChildrenIncoming?value=${folderId}&username=${username}`);
}