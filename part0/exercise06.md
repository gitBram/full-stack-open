```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: reply 201
    Note right of browser: The browser adds the note to the notes list, deletes the html notes and recreates them

```
