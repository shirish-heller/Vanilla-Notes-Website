$(function() {
    var model = {
        init: function() {
            if(!localStorage.hellerNotes) {
                localStorage.hellerNotes = [];
            }
        },
        addNote: function(noteObj) {
            var oldData = JSON.parse(localStorage.getItem('hellerNotes'));
            oldData.push(noteObj);
            localStorage.setItem('hellerNotes', JSON.stringify(oldData));
        },
        getNotes: function() {
            return JSON.parse(localStorage.hellerNotes);
        }
    }

    var octopus = {
        init: function() {
            model.init();
            view.init();
        },
        addNewNote: function(newNote) {
            model.addNote({
                note: newNote
            });
            view.render();
        },
        getAllNotes() {
            return model.getNotes();
        }

    }

    var view = {
        init: function() {
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
        
        render: function() {
            var notesArr = octopus.getAllNotes();
            // liArr = "";
            var ul = $('#notes');
            ul.html('');
            notesArr.forEach(element => {
                var li = document.createElement('li');
                li.setAttribute('class', 'note');
                var text = document.createTextNode(element.note);
                li.appendChild(text);
                ul.append(li);
                // ul.html(liArr);
            });
        }

    }

    octopus.init();
});

