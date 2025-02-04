import React from "react";

function Notes({ notesList, deleteNote, archiveNote }) {
  return (
    <section className="notes-list">
      {notesList.length > 0 ? (
        notesList.map((item, index) => (
          <article className="note-item" key={index}>
            <div className="note-item__content">
              <h3 className="note-item__title">{item.title}</h3>
              <p className="note-item__date">{item.date}</p>
              <p className="note-item__body">{item.note}</p>
            </div>
            <div className="note-item__action">
              <button
                className="note-item__delete-button"
                onClick={() => deleteNote(index)}
              >
                Delete
              </button>
              {archiveNote && (
                <button
                  className="note-item__archive-button"
                  onClick={() => archiveNote(index)}
                >
                  Archive
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
