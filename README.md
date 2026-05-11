# Character Wiki Site

This is a simple, dark-mode character wiki site built with HTML, CSS, and JavaScript. It loads character information from JSON files.

## File Structure

- `index.html`: The main structure of the site.
- `styles.css`: The styling for the dark-mode theme and character cards.
- `script.js`: The logic for loading JSON files and rendering character information.
- `Characters/`: A folder containing your character JSON files (e.g., `aella.json`).

## How to Use

1.  **Place your character JSON files** inside the `Characters/` folder.
2.  **Update `script.js`**: In the `characterList` array at the top of the file, add the filenames of your JSON files.
    ```javascript
    const characterList = ['aella.json', 'your_character.json'];
    ```
3.  **Open `index.html`** in your web browser.
4.  **Click on a character card** to view their full wiki-style info dump, including the multi-phase music section.
5.  **Click "Refresh Characters"** to reload the data from the JSON files.

## JSON Format

Your character JSON files should follow this structure:

```json
{
  "name": "Character Name",
  "age": "Age",
  "gender": "Gender",
  "species": "Species",
  "occupation": "Occupation",
  "appearance": {
    "description": "Detailed description of appearance.",
    "image_url": "path/to/image.jpg"
  },
  "personality": "Description of personality.",
  "backstory": "Detailed backstory.",
  "abilities_skills": [
    "Skill 1",
    "Skill 2"
  ],
  "equipment_inventory": [
    "Item 1",
    "Item 2"
  ],
  "relationships": [
    {
      "name": "Related Character",
      "type": "Relationship Type",
      "description": "Description of the relationship."
    }
  ],
  "notes_trivia": [
    "Trivia 1",
    "Trivia 2"
  ],
  "music": {
    "Phase 1": [
      {
        "title": "Track Title",
        "artist": "Artist Name",
        "file_path": "path/to/music.mp3",
        "description": "Track description."
      }
    ],
    "Phase 2": [
      {
        "title": "Track Title",
        "artist": "Artist Name",
        "file_path": "path/to/music.mp3",
        "description": "Track description."
      }
    ]
  }
}
```

You can add as many phases and tracks as you like!
