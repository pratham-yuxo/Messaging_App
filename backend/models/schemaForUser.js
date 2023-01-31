import mongoose from "mongoose";
const { Schema } = mongoose;
//4_8 45:00
const newSchema = new Schema({
    iss: {
        type: String,
    },
    aud: {
        type: String,
    },
    sub: {
        type: String,

    },
    rbf: {
        type: Number,
    },
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        // required:true
    },
    picture: {
        type: String,
    },
    username: {
        type: String,
    },
    family_name: {
        type: String,
    },
    iat: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    jti: {
        type: String
    },
    byGoogle:{
        type: Boolean,
    },
    bio:{
        type:String
    }
    // editname:{
    //     type:String,
    // }
});
//user is the name of collection
const User = mongoose.model('user', newSchema);
// User.createIndexes();
export default User;