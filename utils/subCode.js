const crypto = require('crypto');

function genCode() {
    return crypto.randomBytes(16).toString('hex')
}

module.exports = {
  genCode
}