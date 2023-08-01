import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState([notesInitial]);

  //get all note
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/note/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZGY5YTg3ZDY4MWEwZGE0ODUxOThjIn0sImlhdCI6MTY5MDE3Mjk3OX0.rYIPMXUSUyDLb4zrRZ8CBdpaKYPkDwMxQz1upr1lxtM",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZGY5YTg3ZDY4MWEwZGE0ODUxOThjIn0sImlhdCI6MTY5MDE3Mjk3OX0.rYIPMXUSUyDLb4zrRZ8CBdpaKYPkDwMxQz1upr1lxtM",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    console.log(id);
    const response = await fetch(`${host}/api/note/deletnote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZGY5YTg3ZDY4MWEwZGE0ODUxOThjIn0sImlhdCI6MTY5MDE3Mjk3OX0.rYIPMXUSUyDLb4zrRZ8CBdpaKYPkDwMxQz1upr1lxtM",
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //edit note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/note/updatnote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZGY5YTg3ZDY4MWEwZGE0ODUxOThjIn0sImlhdCI6MTY5MDE3Mjk3OX0.rYIPMXUSUyDLb4zrRZ8CBdpaKYPkDwMxQz1upr1lxtM",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
