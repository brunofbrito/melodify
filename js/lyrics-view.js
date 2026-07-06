// lyrics-view.js
// Displays synced lyrics for the currently playing track.

function showLyrics(track) {
    const panel = document.querySelector('.lyrics-panel');
    if (!panel) return;
    panel.textContent = track.lyrics || 'No lyrics available.';
}

function highlightCurrentLine(timestampMs) {
    document.querySelectorAll('.lyrics-panel .line').forEach((line) => {
        const start = Number(line.dataset.startMs);
        const end = Number(line.dataset.endMs);
        line.classList.toggle('active', timestampMs >= start && timestampMs < end);
    });
}
