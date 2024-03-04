import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './pages/Layout';
import { Home } from './pages/Home'
import { MyBlogs } from './pages/Myblogs';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import { BlogId } from "./pages/BlogId";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/editblog/:id" element={<EditBlog />} />
          <Route path="/blogid/:id" element={<BlogId />} />
        </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
