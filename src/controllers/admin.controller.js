import Admin from '../schemas/admin.schema.js';
import { errorHandler } from '../helpers/errorHandle.js';
import { adminValidator } from '../helpers/validation.js'
import { generateAccessToken } from '../utils/toker.js';
import { sendMail } from '../utils/mail.js';
import { generateOTP } from '../utils/otp.js';
import { config } from 'dotenv';
import { hash, compare } from 'bcrypt';

config()

class AdminController {

    async addAdmin(req, res) {
        try {
            const check_data = adminValidator.validate(req.body, { abortEarly: false });
            if (check_data.error) {
                return res.status(406).send({
                    error: check_data.error.details
                });
            }
            const { email, username, password, role } = check_data.value;
            const exist_email = await Admin.findOne({ email });
            if (exist_email) {
                return res.status(409).send({
                    error: "Email address already exist"
                });
            }
            const exist_username = await Admin.findOne({ username });
            if (exist_username) {
                return res.status(409).send({
                    error: "Username already exist"
                });
            }
            const hashed_password = await hash(password, 7);
            const new_admin = await Admin.create({
                email, username, hashed_password, role
            });
            return res.status(201).send({
                message: "Admin added successfully",
                data: new_admin
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async signin(req,res){
        try{
            const {email,password} = req.body;
            const admin = await Admin.findOne({email})
            if(!admin){
                return res.status(400).send({
                    message:"Email or password incorecct!!"
                })
            }
            const check_password = await  compare(password,admin.hashed_password)
            if(!check_password){
                return res.status(400).send({
                    message:"Email or password incorecct!!"
                })
            }
            const OTP = generateOTP()
            const mail_options = {
                from:process.env.MAIL_FROM,
                to:email,
                subject:'Confirm email with verification',
                html: `<h1>${OTP}</h1>`
            };
            sendMail(mail_options);
            return res.status(200).send({
                message:"Sent verification code to your email",
                data: OTP
            });
        }
        catch(error){
            errorHandler(error,res)
        };
    }
}

export default new AdminController;