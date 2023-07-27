import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, setNotes, addNote } = context;
  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <NoteItems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
