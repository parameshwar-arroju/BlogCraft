import axios from 'axios';
import { useState, useEffect } from 'react';
import { Blog } from '../components/Blog';

export function Home() {
    const [blogs, setBlogs] = useState([]);
    const editMode = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blogs/all');
                setBlogs(response.data.BlogList);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <Blog blogs={blogs} mode={editMode}/>
    );
}
