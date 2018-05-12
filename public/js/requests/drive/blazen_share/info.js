export default async function info(value) {
    return require('axios').get(`/drive/info?value=${value}`);
}