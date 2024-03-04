import { useParams } from "react-router-dom";
import { Blog } from '../components/Blog';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function BlogId() {
    const editMode = false;
    const navigate = useNavigate();
    const author = localStorage.getItem('author');
    const [username, setUsername] = useState('');
    const [blog, setBlog] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://blogcraft.onrender.com/blogs/' + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBlog(response.data.BlogList);
                setUsername(response.data.BlogList[0].author);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, []);
    function HandleEdit() {
        navigate(`/editblog/${id}`);
    }
    async function HandleDelete() {
        try {
            const responce = axios.delete('https://blogcraft.onrender.com/blogs/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(responce.data);
            navigate('/myblogs');
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        {author == username ?
            (<div className="container d-flex justify-content-center gap-5 p-3">
                <button className="btn btn-outline-dark" onClick={HandleEdit}>Edit Blog</button>
                <button className="btn btn-outline-dark" onClick={HandleDelete}>Delete Blog</button>
            </div>)
            : (<></>)
        }
        <Blog blogs={blog} mode={editMode} />
    </>)
}