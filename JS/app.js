$(function() {
    var model = {
        init() {
            if(!localStorage.hellerNotes) {
                localStorage.hellerNotes = [];
            }
        },
        addNote(noteObj) {
            var oldData = JSON.parse(localStorage.getItem('hellerNotes'));
            oldData.push(noteObj);
            localStorage.setItem('hellerNotes', JSON.stringify(oldData));
        },
        getNotes() {
            return JSON.parse(localStorage.hellerNotes);
        },
        updateNoteStatusInModel(noteId) {
            var NotesArr = model.getNotes();
            NotesArr.forEach(elm=> {
                if(elm.id == noteId)
                elm.status = "completed";
            });
            localStorage.setItem('hellerNotes', JSON.stringify(NotesArr));
        },
        getNewNoteId() {
            var NotesArr = model.getNotes();
            return "note-id-" + (NotesArr.length + 1);   
        }

    }

    var octopus = {
        init() {
            model.init();
            view.init();
        },
        addNewNote(newNote) {
            model.addNote({
                id: model.getNewNoteId(),
                note: newNote,
                date: new Date(),
                status: 'in-progress'
            });
            view.render();
        },
        getAllNotes() {
            return model.getNotes().reverse();
        },

        updateNoteStatus(noteId) {
            model.updateNoteStatusInModel(noteId)
        }

    }

    var view = {
        init() {
            $('#new-note-content').val('')
            $('#clear').click(function() {
                localStorage.hellerNotes = "[]";
                view.render();
            });
            var form = $('#new-note-form');
            form.submit(function(e) {
                var newNote = $('#new-note-content').val();
                if(newNote!== "" && newNote)
                octopus.addNewNote(newNote);
                $('#new-note-content').val('')
                e.preventDefault();
            });
            this.render();
        },

        render() {
            var notesArr = octopus.getAllNotes();
            var ul = $('#notes');
            ul.on('click', function(e) {
                var target = e.target;
                if(target.getAttribute('class') == "cross") {
                    var note = e.target.parentElement;
                    octopus.updateNoteStatus(note.id);
                    view.render();
                }
            });
            ul.html('');
            notesArr.forEach(element => {
                var li = document.createElement('li');
                li.setAttribute('class', 'note');
                li.setAttribute('id', element.id);

                var noteText = document.createElement('span');
                if(element.status == 'completed') {
                    noteText.setAttribute('class', 'note-text strikethrough');
                    li.setAttribute('class', 'note noteCompleted');
                } else {
                    noteText.setAttribute('class', 'note-text');
                }

                var text = document.createTextNode(element.note);
                noteText.appendChild(text);

                //cross
                var pCross = document.createElement('p');
                var textCross = document.createTextNode('DONE');
                pCross.appendChild(textCross);
                pCross.setAttribute('class', 'cross');

                var date = document.createElement('span');
                date.setAttribute('class', 'note-date');
                var dateVal = document.createTextNode(element.date);
                date.appendChild(dateVal);
                li.appendChild(noteText);
                li.appendChild(date);
                li.appendChild(pCross);
                ul.append(li);
            });
        }

    }

    octopus.init();
});

