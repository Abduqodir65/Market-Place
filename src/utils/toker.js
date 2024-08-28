import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()


export const generateAccessToken = (payload) => {
    try {
        return jwt.sign(payload,process.env.ACCESS_TOKEN_KEY,{
            expiresIn:process.env.ACCESS_TOKEN_TIME
        })
    } catch (error) {
        console.log(`Eror on generate token: ${error}`)
    }
}