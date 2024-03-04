import { useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
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
        axios.get('http://localhost:3000/blogs/' + id, {
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
        const response = await axios.patch('http://localhost:3000/blogs/' + id, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/blog/' + id} />
    }

    return (<>
        <form onSubmit={updatePost}>
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
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    </>);
};