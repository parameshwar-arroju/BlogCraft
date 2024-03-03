import { Outlet, Link } from "react-router-dom";
import { Header } from '../components/Header';
import { MyBlogs } from "./Myblogs";
export function Layout() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/myblogs">MyBlogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}
      <Header />
      <Outlet />
    </>
  )
};
