// sleep-timer-ui.js
// Wires the sleep-timer controls on the page to the sleep-timer module.

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sleep-timer');
    if (!container) return;

    const remainingLabel = document.getElementById('sleep-timer-remaining');
    const presets = Array.from(container.querySelectorAll('.sleep-timer__preset'));
    let tickId = null;

    function formatRemaining(ms) {
        const totalSeconds = Math.round(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function refreshLabel() {
        if (!isSleepTimerActive()) {
            stopTicking();
            return;
        }
        remainingLabel.textContent = formatRemaining(sleepTimerRemainingMs());
    }

    function startTicking() {
        remainingLabel.hidden = false;
        refreshLabel();
        tickId = setInterval(refreshLabel, 1000);
    }

    function stopTicking() {
        if (tickId !== null) {
            clearInterval(tickId);
            tickId = null;
        }
        remainingLabel.hidden = true;
        presets.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    }

    presets.forEach((button) => {
        button.addEventListener('click', () => {
            const minutes = Number(button.dataset.minutes);
            const alreadyActive = button.getAttribute('aria-pressed') === 'true';

            if (alreadyActive) {
                cancelSleepTimer();
                stopTicking();
                return;
            }

            startSleepTimer(minutes, () => {
                document.dispatchEvent(new CustomEvent('melodify:pause-playback'));
                stopTicking();
            });
            presets.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
            button.setAttribute('aria-pressed', 'true');
            startTicking();
        });
    });
});
