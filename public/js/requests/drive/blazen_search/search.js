export default async function search(name, page) {
    return require('axios').get(`/drive/search?value=${name}&page=${page}`);
}