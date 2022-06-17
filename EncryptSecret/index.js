const _sodium = require('libsodium-wrappers')

module.exports = async function(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let key = req.body.key;
    let secret = req.body.secret;

    await _sodium.ready;
    const sodium = _sodium;

    // Convert Secret & Base64 key to Uint8Array.
    let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL) //Equivalent of Buffer.from(key, 'base64')
    let binsec = sodium.from_string(secret) // Equivalent of Buffer.from(secret)

    //Encrypt the secret using LibSodium
    let encBytes = sodium.crypto_box_seal(binsec, binkey) // Similar to tweetsodium.seal(binsec,binkey)

    // Convert encrypted Uint8Array to Base64
    let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL) //Equivalent of Buffer.from(encBytes).toString('base64')

    console.log(output)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: output
    };
}