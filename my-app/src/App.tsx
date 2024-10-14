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
 

  return (
    <ThemeContext.Provider value={currentTheme}>

    <div className='app-container' style={{ 
        backgroundColor: currentTheme === themes.light ? '#ffffff' : '#333333',
      }}>
      <form className="note-form">
        <div><input placeholder="Note Title"></input></div>

        <div><textarea></textarea></div>

        <div><button type="submit">Create Note</button></div>
      </form>


      <div className="notes-grid">
        {dummyNotesList.map((note) => (
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

              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
      <div>
     <button onClick  ={toggleTheme}> Toggle Theme </button>
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
