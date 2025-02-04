import React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";

// import style
import "./styles/style.css";

function Navbar() {
  return (
    <header className="note-app__header">
      <h1>Note App</h1>
    </header>
  );
}
function AddNotes({ addNote, title, setTitle, body, setBody, maxTitleLength }) {
  const titleCount = maxTitleLength - title.length;

  const submitHandle = (event) => {
    event.preventDefault();
    const newNote = {
      id: Date.now(),
      title: title,
      body: body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    addNote(newNote);
    setTitle("");
    setBody("");
  };
  return (
    <main className="note-app__body">
      <section className="note-input">
        <h2 className="note-input__title">Create Note</h2>
        <div className="note-input__title__char-limit">
          {titleCount} Characters Remaining
        </div>
        <form onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, maxTitleLength))}
          />
          <textarea
            className="note-input__body"
            placeholder="Write your note here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button type="submit">Add Note</button>
        </form>
      </section>
    </main>
  );
}
function Notes({ notesList, deleteNote, archiveNote, isArchived }) {
  return (
    <section className="notes-list">
      {notesList.length > 0 ? (
        notesList.map((notes) => (
          <article className="note-item" key={notes.id}>
            <div className="note-item__content">
              <h3 className="note-item__title">{notes.title}</h3>
              <p className="note-item__date">
                {new Date(notes.createdAt).toLocaleString()}
              </p>
              <p className="note-item__body">{notes.body}</p>
            </div>
            <div className="note-item__action">
              <button
                className="note-item__delete-button"
                onClick={() => deleteNote(notes.id)}
              >
                Delete
              </button>
              {archiveNote && (
                <button
                  className="note-item__archive-button"
                  onClick={() => archiveNote(notes.id, isArchived)}
                >
                  {isArchived ? "Unarchive" : "Archive"}
                </button>
              )}
            </div>
          </article>
        ))
      ) : (
        <div className="notes-list__empty-message">No notes available</div>
      )}
    </section>
  );
}
function NoteApp() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      createdAt: "2022-04-14T04:27:34.572Z",
    },
  ]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxTitleLength = 50;

  const addNote = (newNote) => {
    setNotes((viewNotes) => [...viewNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((viewNotes) => viewNotes.filter((body) => body.id !== id));
  };

  const archiveNote = (id, isArchived) => {
    setNotes((viewNotes) =>
      viewNotes.map((body) =>
        body.id === id ? { ...body, archived: !isArchived } : body
      )
    );
  };

  const activeNotes = notes.filter((body) => !body.archived);
  const archivedNotes = notes.filter((body) => body.archived);

  return (
    <>
      <Navbar />
      <AddNotes
        addNote={addNote}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        maxTitleLength={maxTitleLength}
      />
      <h2>Active Notes</h2>
      <Notes
        notesList={activeNotes}
        deleteNote={deleteNote}
        archiveNote={archiveNote}
        isArchived={false}
      />
      <h2>Archive Notes</h2>
      <Notes
        notesList={archivedNotes}
        deleteNote={deleteNote}
        archiveNote={archiveNote}
        isArchived={true}
      />
    </>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<NoteApp />);
