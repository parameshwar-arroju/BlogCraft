import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
export function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('https://blogcraft.onrender.com/blogs/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setTitle(response.data.BlogList[0].title);
            setContent(response.data.BlogList[0].content);
            setDescription(response.data.BlogList[0].description);
        });
    }, []);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await axios.patch('https://blogcraft.onrender.com/blogs/' + id, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/blogid/' + id} />
    }

    return (<>
        <div className="container d-flex flex-column justify-content-center mt-lg-4">
            <form onSubmit={updatePost}>
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
                <button className='btn btn-outline-dark w-100 p-2 mt-1'>Update blog</button>
            </form>
        </div>
    </>);
};