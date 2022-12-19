const noteInput = document.querySelector('#note-text');

const saveNoteBtn = document.querySelector('#save-note');
const sortByTextBtn = document.querySelector('#sort-by-text');
const sortByTimeBtn = document.querySelector('#sort-by-time');
const notesContainer = document.querySelector('#notes');

const NOTE = 'note';
let notes = JSON.parse(localStorage.getItem(NOTE));

let sortTextState = true;
let sortTimeState = true;

displayNotes(notes);


saveNoteBtn.addEventListener('click', () => {
    if (noteInput.value !== '') {
        const noteText = noteInput.value;
        noteInput.value = '';
        
        let timestamp = Date.now();

        notes.push({text: noteText, time: timestamp});
        localStorage.setItem(NOTE, JSON.stringify(notes));

        console.log(notes);

        clearNotesContainer();
        displayNotes(notes);

        noteInput.focus();
    }
});


sortByTextBtn.addEventListener('click', () => {
    clearNotesContainer();
    sortNotesByText(notes, sortTextState);
    sortTextState = !sortTextState;
    displayNotes(notes);
});

sortByTimeBtn.addEventListener('click', () => {
   clearNotesContainer();
   sortNotesByTime(notes, sortTimeState);
   sortTimeState = !sortTimeState;
   displayNotes(notes);
});


function displayNotes(loadedNotes) {
    if (loadedNotes !== null) {
        loadedNotes.forEach(el => {
            let p = document.createElement('p');
            p.innerText = el.text;
            notesContainer.appendChild(p);
        });
    } else {
        notes = [];
        noNotesMsg = document.createElement('strong');
        noNotesMsg.innerText = 'No notes!';
        notesContainer.appendChild(noNotesMsg);
    }
}

function sortNotesByText(loadedNotes, sortTextState) {
    if (sortTextState)
        loadedNotes.sort((a, b) => a.text.localeCompare(b.text));
    else 
        loadedNotes.sort((a, b) => b.text.localeCompare(a.text));
}

function sortNotesByTime(loadedNotes, sortTimeState) {
    if (sortTimeState)
        loadedNotes.sort((a, b) => a.time - b.time);
    else
        loadedNotes.sort((a, b) => b.time - a.time);
}

function clearNotesContainer() {
    notesContainer.innerHTML = '';
}