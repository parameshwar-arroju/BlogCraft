import axios from 'axios';
import { useState, useEffect } from 'react';
import { Blog } from '../components/Blog';
export function MyBlogs () {
    const [blogs, setBlogs] = useState([]);
    const editMode = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/blogs/myblogs', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    } 
                });
                setBlogs(response.data.BlogList);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, []);
    return (
    <>
        <Blog blogs={blogs} mode={editMode}/>
    </>);
};