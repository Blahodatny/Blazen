export default async function emptyBin() {
    return require('axios').delete('/drive/emptyBin');
}