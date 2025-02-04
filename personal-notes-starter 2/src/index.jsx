import React from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import AddNotes from "./components/AddNotes";

// import style
import "./styles/style.css";

class NewNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: JSON.parse(sessionStorage.getItem("activeNotes")) || [],
      archivedNotes: JSON.parse(sessionStorage.getItem("archivedNotes")) || [],
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.archiveNote = this.archiveNote.bind(this);
  }

  getCurrentDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  }

  addNote(newNote) {
    const noteWithDate = {
      ...newNote,
      date: this.getCurrentDate(),
    };

    this.setState((prevState) => {
      const updatedActiveNotes = [...prevState.activeNotes, noteWithDate];
      sessionStorage.setItem("activeNotes", JSON.stringify(updatedActiveNotes));
      return { activeNotes: updatedActiveNotes };
    });
  }
  deleteNote(index, isArchived) {
    const confirmDelete = window.confirm(
      "Are you sure want  to delete this note?"
    );
    if (!confirmDelete) return; // return nothing if user cancels

    if (isArchived) {
      this.setState((prevState) => {
        const updatedArchivedNotes = prevState.archivedNotes.filter(
          (_, i) => i !== index
        );
        sessionStorage.setItem(
          "archivedNotes",
          JSON.stringify(updatedArchivedNotes)
        );
        return { archivedNotes: updatedArchivedNotes };
      });
    } else {
      this.setState((prevState) => {
        const updatedActiveNotes = prevState.activeNotes.filter(
          (_, i) => i !== index
        );
        sessionStorage.setItem(
          "activeNotes",
          JSON.stringify(updatedActiveNotes)
        );
        return { activeNotes: updatedActiveNotes };
      });
    }
  }

  archiveNote(index) {
    this.setState((prevState) => {
      const noteToArchive = prevState.activeNotes[index];
      const updatedActiveNotes = prevState.activeNotes.filter(
        (_, i) => i !== index
      );
      const updatedArchivedNotes = [...prevState.archivedNotes, noteToArchive];

      sessionStorage.setItem("activeNotes", JSON.stringify(updatedActiveNotes));
      sessionStorage.setItem(
        "archivedNotes",
        JSON.stringify(updatedArchivedNotes)
      );

      return {
        activeNotes: updatedActiveNotes,
        archivedNotes: updatedArchivedNotes,
      };
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <AddNotes addNote={this.addNote} />
        <h2>Notes</h2>
        <Notes
          notesList={this.state.activeNotes}
          deleteNote={(index) => this.deleteNote(index, false)}
          archiveNote={this.archiveNote}
        />
        <h2>Archieved Notes</h2>
        <Notes
          notesList={this.state.archivedNotes}
          deleteNote={(index) => this.deleteNote(index, true)}
        />
      </>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<NewNotes />);
