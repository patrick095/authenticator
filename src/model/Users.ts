import mongoose from '../database';

export interface IUsers extends mongoose.Document {
    name: string;
    user: string;
    password: string;
    email: string;
    observation: string;
    active: boolean;
    admin: boolean;
    seasons: string[];
    expires: Date;
};

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    observation:{
        type: String,
        required: false
    },
    active:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    },
    seasons:{
        type: Array,
        default: []
    },
    expires:{
        type: Date,
        default: new Date()
    }
});


export default mongoose.model<IUsers>('Users', UserSchema);