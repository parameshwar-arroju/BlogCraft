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
        const response = await axios.post('https://blogcraft.onrender.com/blogs/newblog', data, {
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
        {/* <div className="container-fluid text-center bg-primary text-white fs-3 fw-bold p-3 mb-4">Create Blog</div> */}
        <div className="container d-flex flex-column justify-content-center mt-lg-4">
            <form onSubmit={createNewPost}>
                <div className="form-floating mb-3">
                    <input type="title" className="form-control" id="floatingInput" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} required />
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="description" className="form-control" id="floatingInput" placeholder={'description'} value={description} onChange={ev => setDescription(ev.target.value)} required />
                    <label htmlFor="floatingInput">Description</label>
                </div>
                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile02" onChange={ev => setFiles(ev.target.files)} required />
                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                </div>
                <Editor value={content} onChange={setContent} required />
                <button className='btn btn-outline-dark w-100 p-2 mt-1'>Create blog</button>
            </form>
        </div>
    </>);
};