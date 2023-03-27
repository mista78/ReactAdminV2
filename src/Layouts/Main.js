import React from 'react';
const Main = ({children, ...props}) => {
    return (<div>
        <h1>External layout</h1>
        <p><a href="/en/">Home</a></p>
        <p><a href="/en/blog">blog</a></p>
        {children}
    </div>)
}

export default Main;