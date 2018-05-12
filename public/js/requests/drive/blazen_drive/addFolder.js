export default async function addFolder(parent, folderName) {
    return require('axios').post('/drive/addFolder', {
        parent: parent,
        value: folderName
    })
}