import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function App() {
  const [editorData, setEditorData] = useState(() => {
    
    return JSON.parse(localStorage.getItem('notes')) || [];
  });

  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const mdParser = new MarkdownIt();

 
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(editorData));
  }, [editorData]);

  const addNote = () => {
    if (currentNote.title.trim() && currentNote.content.trim()) {
      setEditorData([...editorData, currentNote]);
      setCurrentNote({ title: '', content: '' });
    } else {
      alert('Please fill in both the title and the content.');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = editorData.filter((_, i) => i !== index);
    setEditorData(updatedNotes);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '20%',
          background: '#f8f9fa',
          borderRight: '1px solid #ddd',
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        <h3>NOTES</h3>
        {editorData.map((note, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '10px',
              background: '#fff',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentNote(note)}
          >
            <strong>{note.title}</strong>
            <button
              style={{
                marginLeft: '10px',
                color: 'red',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(index);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div style={{ width: '80%', padding: '20px' }}>
        <input
          type="text"
          placeholder="Enter title here"
          value={currentNote.title}
          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '1.2em',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        />
        <MdEditor
          style={{ height: '400px' }}
          value={currentNote.content}
          onChange={(data) => setCurrentNote({ ...currentNote, content: data.text })}
          renderHTML={(text) => mdParser.render(text)}
        />
        <button
          onClick={addNote}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default App;