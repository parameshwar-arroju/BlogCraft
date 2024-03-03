import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './pages/Layout';
import { Home } from './pages/Home'
import { MyBlogs } from './pages/Myblogs';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

function App() {
  const [count, setCount] = useState(0);
  const isUnderMaintenance = false;

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/editblog" element={<EditBlog />} />
          {/* <Route path="*" element={<MaintenancePage />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
