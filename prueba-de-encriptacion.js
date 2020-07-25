
//encriptacion con BCRYPT (bcrypt es un hash/KDF de contraseñas)
console.log("----------------------------------")
console.log("------encriptacion con BCRYPT-----")
console.log("----------------------------------")
const bcrypt = require('bcrypt');

// encriptamos la cadena "hola Bhuocenter"
const plaintext = "hola Buhocenter!";
const salt = 10;
const hash = bcrypt.hashSync(plaintext, salt);

console.log(plaintext);
console.log(hash);

// para validar con el cifrado anterior
const compA = bcrypt.compareSync("hola Buhocenter!", hash); // true

console.log(compA);



//encriptacion y decriptacion con node RSA
console.log("----------------------------------")
console.log("----encriptacion con node RSA-----")
console.log("----------------------------------")

const NodeRSA = require('node-rsa');
let key = new NodeRSA({b: 512});
 
const text = 'hola Buhocenter!';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);

//encriptacion con CTR
//documentacion: https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options

console.log("----------------------------------")
console.log("----encriptacion con node CTR-----")
console.log("----------------------------------")

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

var hw = encrypt("Hola buhocenter!")
console.log(`codificado: ${JSON.stringify(hw)}`)
console.log(`decodificado: ${decrypt(hw)}`)
