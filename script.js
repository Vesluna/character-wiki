document.addEventListener('DOMContentLoaded', () => {
    const characterGrid = document.getElementById('character-grid');
    const refreshBtn = document.getElementById('refresh-btn');
    const modal = document.getElementById('character-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    // In a static web environment (like GitHub Pages or local file system), 
    // we cannot automatically list files in a folder.
    // We need a manifest file or a predefined list of character names.
    // For this setup, we'll use a list that the user can easily update.
    const characterList = ['aella.json']; // Add your .json filenames here

    async function loadCharacters() {
        characterGrid.innerHTML = '<p>Loading characters...</p>';
        
        try {
            const characters = await Promise.all(characterList.map(async fileName => {
                const response = await fetch(`Characters/${fileName}`);
                if (!response.ok) {
                    console.error(`Failed to load Characters/${fileName}: ${response.statusText}`);
                    return null;
                }
                return await response.json();
            }));

            // Filter out any null results from failed fetches
            const validCharacters = characters.filter(char => char !== null);

            if (validCharacters.length === 0) {
                characterGrid.innerHTML = '<p>No characters found. Please check the "Characters" folder and your character list in script.js.</p>';
            } else {
                renderCharacterGrid(validCharacters);
            }
        } catch (error) {
            console.error('Error loading characters:', error);
            characterGrid.innerHTML = '<p>Error loading characters. See console for details.</p>';
        }
    }

    function renderCharacterGrid(characters) {
        characterGrid.innerHTML = '';
        characters.forEach(char => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h2>${char.name}</h2>
                <p>${char.species} | ${char.occupation}</p>
            `;
            card.addEventListener('click', () => openCharacterModal(char));
            characterGrid.appendChild(card);
        });
    }

    function openCharacterModal(char) {
        modalBody.innerHTML = `
            <h2>${char.name}</h2>
            <div class="info-section">
                <h3>Basic Info</h3>
                <p><strong>Age:</strong> ${char.age}</p>
                <p><strong>Gender:</strong> ${char.gender}</p>
                <p><strong>Species:</strong> ${char.species}</p>
                <p><strong>Occupation:</strong> ${char.occupation}</p>
            </div>
            <div class="info-section">
                <h3>Appearance</h3>
                <p>${char.appearance.description}</p>
            </div>
            <div class="info-section">
                <h3>Personality</h3>
                <p>${char.personality}</p>
            </div>
            <div class="info-section">
                <h3>Backstory</h3>
                <p>${char.backstory}</p>
            </div>
            <div class="info-section">
                <h3>Abilities & Skills</h3>
                <ul>${char.abilities_skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            </div>
            <div class="info-section">
                <h3>Equipment & Inventory</h3>
                <ul>${char.equipment_inventory.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <div class="info-section">
                <h3>Relationships</h3>
                <ul>${char.relationships.map(rel => `<li><strong>${rel.name} (${rel.type}):</strong> ${rel.description}</li>`).join('')}</ul>
            </div>
            <div class="info-section">
                <h3>Notes & Trivia</h3>
                <ul>${char.notes_trivia.map(note => `<li>${note}</li>`).join('')}</ul>
            </div>
            <div class="info-section">
                <h3>Music</h3>
                <div id="music-container">
                    ${Object.entries(char.music).map(([phase, tracks]) => `
                        <div class="music-phase">
                            <h4>${phase}</h4>
                            ${tracks.map(track => `
                                <div class="music-item">
                                    <h5>${track.title}</h5>
                                    <p><em>${track.artist}</em></p>
                                    <p>${track.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    refreshBtn.addEventListener('click', loadCharacters);

    loadCharacters();
});
