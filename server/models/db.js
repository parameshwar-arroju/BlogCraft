import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI);


const blogSchema = new mongoose.Schema({
    img: {
        filename: String,
        path: String
    },
    title: String,
    description: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.String,
        ref: 'Users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
});

const Blog = mongoose.model('Blogs', blogSchema);
const User = mongoose.model('Users', userSchema);

export { Blog, User };