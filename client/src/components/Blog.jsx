import './blog.css'
import { useNavigate } from 'react-router-dom';
export function Blog({ blogs, mode, page }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    function HandleClick(id) {
        if (mode)
            navigate(`/blogid/${id}`);
        if (!token) navigate('/signin');
    }
    return (<>
        <div className='container d-flex flex-column gap-5'>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog._id} className='blog-outer border border-3' onClick={() => HandleClick(blog._id)}>
                        <img src={blog.img.url} alt={blog.title} className='blog-cover image-fluid ' />
                        <h2 className=''>{blog.title}</h2>
                        <p>{blog.description}</p>
                        {page == 'home' ?
                            <p>Read More</p>
                            :
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        }
                        <p>Author: {blog.author}</p>
                        <p>Date: {new Date(blog.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                ))
            ) : (
                <div className="loading container d-flex justify-content-center align-items-center">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    </>)
}