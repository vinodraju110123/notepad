import { useState } from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


function Mdeditor() {
  const [state ,setState]=useState("**Welcome to Markdown Editor!**")
  const mdParse = new MarkdownIt();
  

  return (
    <>
     <MdEditor value={state} 
     style={{height:"95vh"}}
     onChange={({text,html})=>setState(text)}
     renderHTML={(text)=>mdParse.render(text)}
     />
     
    </>
  )
}

export default Mdeditor