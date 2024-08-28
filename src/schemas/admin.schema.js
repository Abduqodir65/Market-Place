import { Schema, model } from "mongoose";

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'manager'],
            default: 'superadmin'
        }
    },
    {
        versionKey: false
    }
);

const Admin = model('Admin', adminSchema);
export default Admin;
