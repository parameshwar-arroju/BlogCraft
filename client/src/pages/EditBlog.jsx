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
        <div className="container d-flex flex-column justify-content-center">
            <form onSubmit={updatePost}>
                <input type="title"
                    placeholder={'Title'}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} required />
                <input type="description"
                    placeholder={'description'}
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} required />
                <input type="file"
                    onChange={ev => setFiles(ev.target.files)} required />
                <Editor onChange={setContent} value={content} required />
                <button style={{ marginTop: '5px' }}>Update post</button>
            </form>
        </div>
    </>);
};