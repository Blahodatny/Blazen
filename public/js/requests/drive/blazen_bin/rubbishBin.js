export default async function rubbishBin() {
    return require('axios').get('drive/rubbishBin');
}