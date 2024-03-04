import './blog.css'
import { useNavigate } from 'react-router-dom';
export function Blog({ blogs, mode }) {
    const navigate = useNavigate();
    function HandleClick(id) {
        if (mode)
            navigate(`/blogid/${id}`);
    }
    return (<>
        <div className='container d-flex flex-column gap-5'>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog._id} className='blog-outer border border-3' onClick={() => HandleClick(blog._id)}>
                        <img src={'https://blogcraft.onrender.com/' + blog.img.path} alt={blog.title} className='blog-cover image-fluid ' />
                        <h2 className=''>{blog.title}</h2>
                        <p>{blog.description}</p>
                        {/* <p>{blog.content}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <p>Author: {blog.author}</p>
                        <p>Date: {blog.date}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </>)
}