const welcomeOverlay = document.getElementById('welcomeOverlay');
const closeWelcomeBtn = document.getElementById('closeWelcome');
const landpageContent = document.getElementById('landpageContent');

const bearBtn = document.getElementById('openNotepaper');
const notepaperOverlay = document.getElementById('notepaperOverlay');
const closeNoteBtn = document.getElementById('closeNote');

const cameraBtn = document.getElementById('openCollection');
const collectionOverlay = document.getElementById('collectionOverlay');
const closeCollectionBtn = document.getElementById('closeCollection');

const puddingBtn = document.getElementById('openInfo');
const infoOverlay = document.getElementById('infoOverlay');
const closeInfoBtn = document.getElementById('closeInfo');

const submitNote = document.getElementById('submitNote');
const toInput = document.getElementById('toInput');
const noteInput = document.getElementById('noteInput');
const noteGrid = document.getElementById("noteGrid");
const infoNotes = document.getElementById("infoNotes");

const API_URL = "http://localhost:3000";

async function fetchData(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, options);
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

function createNoteElement(item) {
    const div = document.createElement('div');
    div.classList.add("mini-note");
    div.innerHTML = `
        <p class="mini-to">To: ${item.to}</p>
        <p class="mini-text">${item.note}</p>
    `;
    return div;
}

submitNote.addEventListener('click', async (e) => {
    e.preventDefault();

    const to = toInput.value.trim();
    const note = noteInput.value.trim();

    if (!to || !note) return;

    try {
        submitNote.disabled = true;

        const result = await fetchData("/postnote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, note })
        });

        if (result) {
            toInput.value = "";
            noteInput.value = "";
            notepaperOverlay.classList.remove("active");
        }
    } catch (err) {
        console.error("Post error:", err);
    } finally {
        submitNote.disabled = false;
    }
});

cameraBtn.addEventListener('click', async () => {
    collectionOverlay.classList.add('active');
    const notes = await fetchData("/getnotes");
    
    if (notes) {
        noteGrid.innerHTML = "";
        notes.forEach(item => {
            noteGrid.appendChild(createNoteElement(item));
        });
    }
});

puddingBtn.addEventListener('click', async () => {
    infoOverlay.classList.add('active');
    const notes = await fetchData("/getnotes");
    if (notes) {
        infoNotes.innerText = `Notes: ${notes.length}`;
    }
});

closeWelcomeBtn.addEventListener('click', () => {
    welcomeOverlay.classList.remove('active');
    landpageContent.style.display = 'block';
    requestAnimationFrame(() => {
        landpageContent.style.opacity = '1';
    });
});

bearBtn.addEventListener('click', () => notepaperOverlay.classList.add('active'));
closeNoteBtn.addEventListener('click', () => notepaperOverlay.classList.remove('active'));
closeCollectionBtn.addEventListener('click', () => collectionOverlay.classList.remove('active'));
closeInfoBtn.addEventListener('click', () => infoOverlay.classList.remove('active'));

welcomeOverlay.classList.add('active');
notepaperOverlay.classList.remove('active');
collectionOverlay.classList.remove('active');
landpageContent.style.display = 'none';
landpageContent.style.opacity = '0';