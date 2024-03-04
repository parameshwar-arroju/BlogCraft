import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Editor } from '../components/Editor';
export function CreateBlog() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/blogs/newblog', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status) {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (<>
        <div className="container d-flex flex-column justify-content-center">
            <form onSubmit={createNewPost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <input type="description"
                    placeholder={'description'}
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} />
                <input type="file"
                    onChange={ev => setFiles(ev.target.files)} />
                <Editor value={content} onChange={setContent} />
                <button className='btn btn-outline-dark'>Create post</button>
            </form>
        </div>
    </>);
};