import React from "react";

function Notes({ notesList, deleteNote, archiveNote, isArchived }) {
  return (
    <section className="notes-list">
      {notesList.length > 0 ? (
        notesList.map((note) => (
          <article className="note-item" key={note.id}>
            <div className="note-item__content">
              <h3 className="note-item__title">{note.title}</h3>
              <p className="note-item__date">
                {new Date(note.createdAt).toLocaleString()}
              </p>
              <p className="note-item__body">{note.body}</p>
            </div>
            <div className="note-item__action">
              <button
                className="note-item__delete-button"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
              {archiveNote && (
                <button
                  className="note-item__archive-button"
                  onClick={() => archiveNote(note.id, isArchived)}
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

export default Notes;
