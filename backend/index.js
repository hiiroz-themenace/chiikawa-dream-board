const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const NOTES_FILE = path.join(__dirname, "notes.json");

app.use(cors());
app.use(express.json());

const storage = {
    read() {
        try {
            if (!fs.existsSync(NOTES_FILE)) {
                fs.writeFileSync(NOTES_FILE, JSON.stringify([]));
                return [];
            }
            return JSON.parse(fs.readFileSync(NOTES_FILE, "utf-8"));
        } catch (err) {
            return [];
        }
    },

    write(data) {
        fs.writeFileSync(NOTES_FILE, JSON.stringify(data, null, 2));
    }
};

app.get("/getnotes", (req, res) => {
    res.json(storage.read());
});

app.post("/postnote", (req, res) => {
    const { to, note } = req.body;
    
    if (!to || !note) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const notes = storage.read();
    const newNote = {
        id: Date.now(),
        to,
        note,
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);
    storage.write(notes);
    res.status(201).json({ message: "Success", data: newNote });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});