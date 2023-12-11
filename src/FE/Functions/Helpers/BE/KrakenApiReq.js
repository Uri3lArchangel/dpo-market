// DepositMethods.js
import crypto from 'crypto'
import qs from 'querystring';

const api_url = 'https://api.kraken.com';
const myKey = process.env.KRAKENAPI;
const myPrivateKey = process.env.KRAKENSECRET;

function GetMessageSignature(path, requestParams, secret, nonce) {
    const message = qs.stringify(requestParams);
    const secretBuffer = Buffer.from(secret, 'base64');
    
    const encoded = `${nonce}${message}`;
    const messageHash = crypto.createHash('sha256').update(encoded, 'utf8').digest('binary');
    const signature = crypto.createHmac('sha512', secretBuffer).update(path + messageHash, 'binary').digest('base64');

    return signature;
}

export async function krakenRequest(urlPath, requestParams) {
    
    const signature = GetMessageSignature(urlPath, requestParams, myPrivateKey, requestParams.nonce);
    const headers = {
        'API-Key': myKey,
        'API-Sign': signature,
        "Content-Type":"application/x-www-form-urlencoded"
    };
    const options = {
        method: 'POST',
        headers: headers,
        body: qs.stringify(requestParams),
    };

    const res = await fetch(api_url+urlPath,options)
    const data = await res.json()
    return data
}

