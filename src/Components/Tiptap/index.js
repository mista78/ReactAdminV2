import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import styled from 'styled-components';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';

const Editors = styled.div`
border-radius: 25px;
background-color: rgb(68, 68, 68);
color: rgb(255, 255, 255);
height: 40px;
display: flex;
padding: 0px 1em;
align-items: center;
.color {
    height: 28px
}
& > * {
    background-color: transparent;
    border: none;
    padding: 0px;
    margin: 0px;
    height: 40px;
    width: 28px;
    flex: 0 0 auto;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(204, 204, 204);
}
select {
    background-color: transparent;
    border: none;
    outline: none;
    &:focus {
        outline: none;
    }
}
.colo {
    &:hover {
        border: 1px solid #fff;
        transform: scale(1.1);
    }
}
`;

const color = ["#0d6efd",
    "#6610f2",
    "#6f42c1",
    "#d63384",
    "#dc3545",
    "#fd7e14",
    "#ffc107",
    "#198754",
    "#20c997",
    "#0dcaf0",
    "#fff",
    "#6c757d",
    "#0d6efd",
    "#6c757d",
    "#198754",
    "#0dcaf0",
    "#ffc107",
    "#dc3545",
    "#f8f9fa",
    "#212529"]

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }
    const colorRef = useRef("#ccc");
    const details = useRef(null);
    const [colorPicker, setColor] = useState("#0d6efd");
    return (
        <>
            <BubbleMenu editor={editor}>
                <Editors>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"></path></svg>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="currentColor"></path></svg>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="currentColor"></path></svg>
                    </button>
                    <details ref={details}>
                        <summary style={{
                            display: "grid",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "center",
                        }} ref={colorRef}>A</summary>
                        <div  style={{ display: 'grid', gridTemplateColumns: "repeat(7,16px)", position: "absolute", top: "100%", background: "rgb(68, 68, 68)", gridGap: "5px", padding: '5px', transform: "translateX(-15%)" }}>
                            {color.map((item, index) => {
                                return <div
                                    
                                    key={index}
                                    className={`colo ${editor.isActive('textStyle', { color: item }) ? (() => {
                                        colorRef.current.style.color = item;
                                    })() : ''}`}
                                    onClick={() => {
                                        editor.chain().focus().setColor(item).run();
                                        colorRef.current.style.color = item;
                                        details.current.removeAttribute('open')
                                    }} style={{ backgroundColor: item, height: '16px', width: "100%" }}></div>
                            })}
                        </div>
                    </details>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="currentColor"></path></svg>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        strike
                    </button>
                    <button onClick={() => editor.chain().focus().clearNodes().run()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z" fill="currentColor"></path></svg>
                    </button>

                    <select onChange={(e) => {
                        if (e.target.value === '') return;
                        if (e.target.value === 'p') {
                            editor.chain().focus().setParagraph().run()
                        } else {
                            editor.chain().focus().toggleHeading({ level: Math.round(e.target.value * 1) }).run()
                        }
                    }}>
                        <option selected={editor.isActive('paragraph') ? 'is-active' : ''} value="p">p</option>
                        {[1, 2, 3, 4, 5, 6].map(level => {
                            return (
                                <option
                                    value={level}
                                    selected={editor.isActive('heading', { level })}
                                >
                                    H{level}
                                </option>
                            )
                        })}
                    </select>
                </Editors>
            </BubbleMenu>
        </>
    )
}

const Tiptap = ({ data }) => {
    const {state, dispatch} = useContext(AppContext);
    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        content: data?.content || `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
    display: none;
  }</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
    });
    

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} onBlur={e => {
                // add content to state
                const components = state.components.map(item => updatePropertyById(data.id, item, 'content', editor.getHTML()));
                dispatch({ type: 'ADD_COMPONENT', components: [...components] });

                console.log('onBlur editor', editor.getHTML(), editor.getJSON());
            }} />
        </div>
    )
}



export default Tiptap