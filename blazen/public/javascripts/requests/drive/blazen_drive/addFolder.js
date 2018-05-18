export default async (parent, folderName) => require('axios').post('/drive/addFolder', {
    parent: parent,
    value: folderName
})