import React from "react";

class AddNotes extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: "",
      note: "",
    };
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onNoteChangeEventHandler = this.onNoteChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onNoteChangeEventHandler(event) {
    this.setState(() => {
      return {
        note: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, note } = this.state;

    // Pass new note to parent
    this.props.addNote({ title, note });

    this.setState({ title: "", note: "" });
  }
  render() {
    const maxTitleLength = 100;
    const titleRemaining = maxTitleLength - this.state.title.length;
    return (
      <main className="note-app__body">
        <section className="note-input">
          <h2 className="note-input__title">Create Note</h2>
          <div className="note-input__title__char-limit">
            {titleRemaining} Characters Remaining
          </div>
          <form onSubmit={this.onSubmitEventHandler}>
            <input
              type="text"
              placeholder="Note Title"
              value={this.state.title}
              onChange={this.onTitleChangeEventHandler}
              maxLength={maxTitleLength}
            />
            <textarea
              className="note-input__body"
              placeholder="Write your note here..."
              value={this.state.note}
              onChange={this.onNoteChangeEventHandler}
            ></textarea>
            <button type="submit">Add Note</button>
          </form>
        </section>
      </main>
    );
  }
}

export default AddNotes;
