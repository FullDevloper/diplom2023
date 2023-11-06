import jwt from "jsonwebtoken"
import logger from "../configs/logger.js"
// import { error } from "winston"
// import { resolve } from "styled-jsx/css"
export const sign =async(payload,expiresIn,secret)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,secret,{expiresIn:expiresIn},(error,token)=>{
            if(error){
                logger.error()
                reject(error)
            }
            else{
                resolve(token)
            }
        })
    })
}
export const verify = async (token, secret) => {
    return new Promise((resolve, reject) => {
        console.log(secret,"verfiy")
      jwt.verify(token, secret, (error, payload) => {
        if (error) {
          logger.error(error);
          resolve(null);
        } else {
          resolve(payload);
        }
      });
    });
  };