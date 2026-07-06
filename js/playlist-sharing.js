// playlist-sharing.js
// Adds a "Share" button to every playlist card.

function createShareButton(playlist) {
    const button = document.createElement('button');
    button.className = 'share-button';
    button.textContent = 'Share';
    button.addEventListener('click', () => openShareDialog(playlist));
    return button;
}

function openShareDialog(playlist) {
    console.log('Opening share dialog for playlist:', playlist.name);
}
