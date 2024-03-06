import './blog.css'
import { useNavigate } from 'react-router-dom';
export function Blog({ blogs, mode, page }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    function HandleClick(id) {
        if (mode)
            navigate(`/blogid/${id}`);
        // if (!token) navigate('/signin');
    }
    return (<>
        <div className='container d-flex flex-column gap-5'>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog._id} className='blog-outer border-dark border-bottom'>
                        <img src={blog.img.url} alt={blog.title} className='pointercursor blog-cover image-fluid' onClick={() => HandleClick(blog._id)}/>
                        <h1 className=''>{blog.title}</h1>
                        <p>{blog.description}</p>
                        {page == 'home' ?
                            <p onClick={() => HandleClick(blog._id)}><a className="pointercursor btn btn-dark"><i>👉Read More</i></a></p>
                            :
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        }
                        <div className="d-md-flex flex-row-reverse">
                            <p className='pe-5'>🙍<b>Author :</b> {blog.author}</p>
                            <p className='me-auto'>📅<b>Date :</b> {new Date(blog.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                        </div>
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