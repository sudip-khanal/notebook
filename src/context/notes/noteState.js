import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const noteInitial = [
    {
      _id: "64c0a65c477712c65fe6f6e2",
      user: "64bbdc2d9652a9e22e594279",
      title: " this is a new note from sudip",
      description: "I am fine thank you",
      tag: "personal",
      date: "2023-07-26T04:51:40.346Z",
      __v: 0,
    },
    {
      _id: "64c0a66a477712c65fe6f6e4",
      user: "64bbdc2d9652a9e22e594279",
      title: " this is a new note from binaaaa",
      description: "I am fine thank you",
      tag: "personal",
      date: "2023-07-26T04:51:54.952Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(noteInitial);

  // Add a note
  console.log("Adding a new note");
  //todo api call

  const addNote = (title, description, tag) => {
    const note = {
      _id: "64c0a66a477712c65fe6f6e49865",
      user: "64bbdc2d9652a9e22e594279",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-26T04:51:54.952Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = (id) => {
    //todo api call
    console.log("deleting note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //edit note
  const editNote = () => {};

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
