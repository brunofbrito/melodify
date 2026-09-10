// sleep-timer.js
// Stops playback after a chosen duration so listeners can fall asleep to music.

const SLEEP_TIMER_PRESETS = [15, 30, 45, 60];

let sleepTimerId = null;
let sleepTimerEndsAt = null;

function startSleepTimer(minutes, onExpire) {
    cancelSleepTimer();
    const ms = minutes * 60 * 1000;
    sleepTimerEndsAt = Date.now() + ms;
    sleepTimerId = setTimeout(() => {
        sleepTimerId = null;
        sleepTimerEndsAt = null;
        if (typeof onExpire === 'function') onExpire();
    }, ms);
}

function cancelSleepTimer() {
    if (sleepTimerId !== null) {
        clearTimeout(sleepTimerId);
        sleepTimerId = null;
    }
    sleepTimerEndsAt = null;
}

function sleepTimerRemainingMs() {
    return sleepTimerEndsAt === null ? 0 : Math.max(sleepTimerEndsAt - Date.now(), 0);
}

function isSleepTimerActive() {
    return sleepTimerId !== null;
}
