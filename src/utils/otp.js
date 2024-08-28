import { generate } from "otp-generator";

export const generateOTP = () => {
    try {
        return generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars:false
        })
    } catch (error) {
        console.log(`Error on generating OTP: ${error}`)
    }
}