import qs from 'qs';
import crypto from 'crypto'

export const GetMessageSignature = (path, request, secret, nonce) => {
    const message       = qs.stringify(request);
    const secret_buffer = new Buffer(secret, 'base64');
    const hash          = new crypto.createHash('sha256');
    const hmac          = new crypto.createHmac('sha512', secret_buffer);
    const hash_digest   = hash.update(nonce + message).digest('binary');
    const hmac_digest   = hmac.update(path + hash_digest, 'binary').digest('base64');

    return hmac_digest;
};