document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    const notesArea = document.getElementById('notes');
    const savedNotesDiv = document.getElementById('savedNotes');

    // Função para atualizar a div de anotações
    function updateSavedNotesDisplay() {
        const savedNotes = localStorage.getItem('myNotes');

        savedNotesDiv.innerHTML = '';

        if (savedNotes) {
            let notesArray;
            try {
                notesArray = JSON.parse(savedNotes);
            } catch(e) {
                console.error('Erro ao ler as anotações:', e);
                // Aqui você pode decidir como lidar com dados corrompidos
                // Por exemplo, limpar o Local Storage ou tentar corrigir os dados
                return;
            }

            notesArray.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('card');
                noteDiv.classList.add('col-12');
                noteDiv.classList.add('col-sm-6');
                noteDiv.classList.add('col-md-4');
                noteDiv.classList.add('p-5');
                noteDiv.classList.add('text-');
                noteDiv.textContent = note;
                savedNotesDiv.appendChild(noteDiv);
            });
        }
    }

    // Carregar e exibir anotações salvas
    updateSavedNotesDisplay();

    // Salvar nova anotação
    saveButton.addEventListener('click', function() {
        const currentNotes = localStorage.getItem('myNotes');
        let notesArray = [];

        if (currentNotes) {
            try {
                notesArray = JSON.parse(currentNotes);
            } catch(e) {
                console.error('Erro ao ler as anotações existentes:', e);
                // Decida como lidar com dados corrompidos
                // Pode optar por limpar ou tentar corrigir
            }
        }

        notesArray.push(notesArea.value);
        localStorage.setItem('myNotes', JSON.stringify(notesArray));
        notesArea.value = '';
        updateSavedNotesDisplay();
        alert('Anotação salva!');
    });
});
