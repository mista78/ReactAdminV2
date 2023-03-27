import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Editor from "../Editor";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="?page=wp-kmaoulida-dashboard-editor" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<Editor />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
        <h2>Home <Link to="/editor">Editor</Link></h2>
      {/* 
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav> */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home <Link to="/editor">Editor</Link></h2>
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}