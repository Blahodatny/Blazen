module.exports = (password, salt) => {
    const passwordHash = (new require('crypto'))
        .createHmac('sha512', salt)
        .update(password)
        .digest(`hex`);
    return {salt, passwordHash}
};