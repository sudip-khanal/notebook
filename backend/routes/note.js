const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
//Route1: Get all the notes using: get "/api/note/fetchnote".

router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route2: add new  notes using: post "/api/note/addnote".login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors return  bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tag, user: req.user.id });
      const Savenote = await note.save();
      res.json(Savenote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route3: update   notes using: post "/api/note/updatenote".login required
router.put("/updatnote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed..");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route4: delet notes using: delet "/api/note/deletnote".login required

router.delete("/deletnote/:id", fetchuser, async (req, res) => {
  // Find note to be delete and delete it

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }
    //Allow deletion only if the user onws it

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed..");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
