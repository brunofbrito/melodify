// volume-normalization.js
// Normalizes playback loudness across tracks.

const TARGET_LOUDNESS_DB = -14;
const MAX_GAIN_DB = 9;

function normalizeTrack(track) {
    const gain = TARGET_LOUDNESS_DB - track.loudnessDb;
    return Math.min(Math.max(gain, -MAX_GAIN_DB), MAX_GAIN_DB);
}
