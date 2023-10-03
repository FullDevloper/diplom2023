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