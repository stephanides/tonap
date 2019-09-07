import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as openssl from 'openssl-nodejs';

export default class PaymentConfirmationController {
  public async manage(req: Request, res: Response, next: NextFunction) {
    try {
      if(Object.keys(req.query).length > 0 && req.query.constructor === Object) {
        const {
          AC, AMT, CURR, CS, VS, RES, TID, TIMESTAMP, HMAC, ECDSA_KEY, ECDSA
        } = req.query;
        // const MID = '9999';
        const KEY = '7248666c5a6b4f3753526179624a7a7649687342525453536f34662d7442614e597938384964744a30527a4e574f6e794e4c73715f526d6c6a6b343131554778';
        const RURL = 'https://tonap.sk/potvrdenie-platby';
        const stringToSign = AMT + CURR + VS + RES + AC + TID + TIMESTAMP; // AMT + CURR + CS + VS + RES + TID + TIMESTAMP;
        // const TB_PUB_KEY_PATH = 'https://moja.tatrabanka.sk/e-commerce/ecdsa_keys.txt';
        const HMAC_CHECK = await this.hash_hmac(stringToSign, KEY, next);
        // const stringToVerify = stringToSign + HMAC;
  
        // const verified = this.desSign(stringToVerify, KEY);
        // console.log(verified);
        
        if ((HMAC === HMAC_CHECK) && (RES === 'OK')) {
          res.render("payment-confirmation", {
            page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
            success: true,
          });
        } else {
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
      } else {
        res.render("payment-confirmation", {
          page: 'Potvrdenie platby - Tonap - Slovenský laboratórny materiál',
          success: false,
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  private desSign(value, key) {
    var sha1 = crypto.createHash('sha1');
    var buffer = sha1.update(value).digest();
  
    value = buffer.slice(0, 8);
    key = Buffer.from(key, 'ascii');
  
    var des = crypto.createCipheriv('DES-ECB', key, '');
    var sign = des.update(value) + des.final('base64');
  
    return Buffer.from(sign, 'base64').toString('hex').substring(0, 16).toUpperCase();
  }

  private hash_hmac(string: string, key: string, next: NextFunction) {
    return new Promise(async (resolve, reject) => {
      try {
        const hmac = crypto.createHmac('SHA256', Buffer.from(key, 'hex'));
  
        hmac.update(string);

        resolve(hmac.digest('hex'));
      } catch (err) {
        return next(err);
      }
    });
  }
}
