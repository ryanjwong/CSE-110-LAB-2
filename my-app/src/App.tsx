import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
import { ThemeContext, themes } from "./themeContext";




function App() {
  const [favorites, setFavorites] = useState<Note[]>([])
  function handleFavorite(note: Note) {
    if (favorites.includes(note)) {
      setFavorites(favorites.filter(item => item.id !== note.id))
    } else {
      setFavorites([...favorites, note])
    }
    console.log(favorites)
  }
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };


  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

function deleteNote(note: Note) {
  setNotes(notes.filter(item => item.id !== note.id))
}


  return (
    <ThemeContext.Provider value={currentTheme}>

      <div className='app-container' style={{
        backgroundColor: currentTheme === themes.light ? '#ffffff' : '#333333',
      }}>
        <form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>



        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item">
              <div className="notes-header">
                <button onClick={() => handleFavorite(note)}>
                  {favorites.some(fav => fav.id === note.id) ? (
                    <FaHeart style={{ color: 'red' }} />
                  ) : (
                    <CiHeart />
                  )}
                </button>

                <button onClick={() => deleteNote(note)}>x</button>
              </div>
              <h2 contentEditable="true"> {note.title} </h2>
              <p contentEditable="true"> {note.content} </p>
              <p contentEditable="true"> {note.label} </p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={toggleTheme}> Toggle Theme </button>
        </div>
        <div>
          <h2>List of favorites:</h2>
          <ul>
            {favorites.map(note => (
              <li key={note.id}>{note.title}</li>
            ))}
          </ul>
        </div>


      </div>
    </ThemeContext.Provider>


  );
}

export default App;
