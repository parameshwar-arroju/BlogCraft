import axios from 'axios';
import { useState, useEffect } from 'react';
export function MyBlogs () {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
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
        <div className='container d-flex flex-column gap-5'>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog._id} className='border border-3'>
                        <img src={'http://localhost:3000/'+blog.img.path} alt={blog.title} className='image-fluid w-50 object-fit-contain'/>
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p>{blog.content}</p>
                        <p>Author: {blog.author}</p>
                        <p>Date: {blog.date}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </>);
};