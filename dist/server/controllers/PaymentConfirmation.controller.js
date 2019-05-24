"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class PaymentConfirmationController {
    manage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query: { AMT, CURR, CS, VS, RES, TID, TIMESTAMP, HMAC, ECDSA_KEY, ECDSA } } = req;
                // const MID = '9999';
                const KEY = '7248666c5a6b4f3753526179624a7a7649687342525453536f34662d7442614e597938384964744a30527a4e574f6e794e4c73715f526d6c6a6b343131554778';
                const RURL = 'https://tonap.sk/potvrdenie-platby';
                const stringToSign = AMT + CURR + VS + CS + RES + TID + TIMESTAMP; // AMT + CURR + CS + VS + RES + TID + TIMESTAMP;
                // const TB_PUB_KEY_PATH = 'https://moja.tatrabanka.sk/e-commerce/ecdsa_keys.txt';
                const HMAC_CHECK = yield this.hash_hmac(stringToSign, KEY, next);
                // const stringToVerify = stringToSign + HMAC;
                // const verified = this.desSign(stringToVerify, KEY);
                // console.log(verified);
                if ((HMAC === HMAC_CHECK) && (RES === 'OK')) {
                    res.render("payment-confirmation", {
                        page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
                        success: true,
                    });
                }
                else {
                    res.render("payment-confirmation", {
                        page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
                        success: false,
                    });
                }
                /* https.get(TB_PUB_KEY_PATH, (response) => {
                  if (response.statusCode === 200) {
                    response.on('data', (data) => {
                      const bufferString = data.toString();
                      const pub_keys_arr = bufferString.split('KEY_ID');
                      let pub_keys = [];
          
                      for (let i = 0; i < pub_keys_arr.length; i++) {
                        const parsedKey = pub_keys_arr[i].split('-----BEGIN PUBLIC KEY-----')[1];
          
                        if (parsedKey) {
                          const key = parsedKey.split('-----END PUBLIC KEY-----')[0];
                          const parsedNewKey = key.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
                          pub_keys.push(parsedNewKey);
                        }
                      }
          
                    if (HMAC_CHECK === HMAC) {
                        // sucess
                        const publicKEY = '-----BEGIN PUBLIC KEY-----\n' + pub_keys[parseInt(ECDSA_KEY) - 1] + '\n-----END PUBLIC KEY-----';
                        const verifier = crypto.createVerify('sha256'); // sha256
                        
                        verifier.update(stringToVerify);
                        const result = verifier.verify(publicKEY, ECDSA, 'hex');
          
                        // console.log(result);
                        // openssl_verify(ECDSA_STRING, ECDSA, PUBLIC_KEY, 'sha256')
                        // openssl('openssl req -config csr.cnf -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout key.key -out certificate.crt')
                        
                      }
          
                      // verify
                      // fn (stringToVerify, ECDS, publicKey)
          
          
                      let err = false;
          
                      res.render("payment-confirmation", {
                        page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
                        success: err,
                      });
                    });
                  } else {
                    res.render("payment-confirmation", {
                      page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
                      success: true,
                    });
                  }
                }); */
            }
            catch (err) {
                return next(err);
            }
        });
    }
    desSign(value, key) {
        var sha1 = crypto.createHash('sha1');
        var buffer = sha1.update(value).digest();
        value = buffer.slice(0, 8);
        key = Buffer.from(key, 'ascii');
        var des = crypto.createCipheriv('DES-ECB', key, '');
        var sign = des.update(value) + des.final('base64');
        return Buffer.from(sign, 'base64').toString('hex').substring(0, 16).toUpperCase();
    }
    hash_hmac(string, key, next) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hmac = crypto.createHmac('SHA256', Buffer.from(key, 'hex'));
                hmac.update(string);
                resolve(hmac.digest('hex'));
            }
            catch (err) {
                return next(err);
            }
        }));
    }
}
exports.default = PaymentConfirmationController;
