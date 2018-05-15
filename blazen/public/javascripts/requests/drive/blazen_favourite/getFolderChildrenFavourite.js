export default async function getFolderChildrenFavourite(folderId) {
    return require('axios').get(`/drive/getFolderChildrenFavourite?value=${folderId}`);
}