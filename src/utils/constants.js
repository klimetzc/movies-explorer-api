const status400 = 400;
const status401 = 401;
const status404 = 404;
const status500 = 500;
const status403 = 403;
const status409 = 409;
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const jwtSecretKey = 'ultra-secret-key';
module.exports = {
  status400, status401, status404, status409, status500, status403, jwtSecretKey, urlRegExp,
};
