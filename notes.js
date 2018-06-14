//console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    //notes = JSON.parse(notesString);
    return JSON.parse(notesString);
    } catch(e) {
      return [];
    }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  //console.log('Adding note', title, body);
  //var notes = [];
  var notes = fetchNotes();
  var note = {
    title: title,
    body:body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0) {
    notes.push(note);
    //fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    saveNotes(notes);
    return note;
  }
 };

var getAll =() => {
  //console.log('Getting all notes');  
  return fetchNotes();
};

var getNote = (title) => {
  //console.log('Getting note', title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var removeNote = (title) => {
  //console.log('Removing note', title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote : addNote, // or in ES6 can simply write addNote as LHS = RHS
  getAll,
  getNote,
  removeNote,
  logNote
};

// module.exports.addNote = () => {
//   console.log('add note');
//   return 'New note';
// }


// console.log(module);