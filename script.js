/* elements */
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

/*const submitNote = document.getElementById('submitNote');
const toInput = document.getElementById('toInput');
const noteInput = document.getElementById('noteInput');
const noteGrid = document.getElementById('noteGrid');
const infoNotes = document.getElementById('infoNotes');
const infoUsers = document.getElementById('infoUsers');
const infoStatus = document.getElementById('infoStatus');*/

/* initial state */
welcomeOverlay.classList.add('active');
notepaperOverlay.classList.remove('active');
collectionOverlay.classList.remove('active');
landpageContent.style.display = 'none';
landpageContent.style.opacity = '0';

/* welcome card*/
closeWelcomeBtn.addEventListener('click', () => {
    welcomeOverlay.classList.remove('active');
    landpageContent.style.display = 'block';
     requestAnimationFrame(() => {
        landpageContent.style.opacity = '1';
    });
});

/* buttons */
bearBtn.addEventListener('click', () => {
    notepaperOverlay.classList.add('active');
});

cameraBtn.addEventListener('click', () => {
    collectionOverlay.classList.add('active');
});

puddingBtn.addEventListener('click', () => {
    infoOverlay.classList.add('active');
});

closeNoteBtn.addEventListener('click', () => {
    notepaperOverlay.classList.remove('active');
});

closeCollectionBtn.addEventListener('click', () => {
    collectionOverlay.classList.remove('active');
});

closeInfoBtn.addEventListener('click', () => {
    infoOverlay.classList.remove('active');
});

/* update board */
