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

function copyPlaylistLink(playlist) {
    const url = `https://melodify.example/playlists/${playlist.id}`;
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(url);
    }
    // Fallback for browsers without the Clipboard API
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}
