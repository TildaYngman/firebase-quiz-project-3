const timerBar = document.getElementsByClassName('timer-bar')[0];

setInterval(() => {
    const computedStyle = getComputedStyle(timerBar);
    const width = parseFloat(computedStyle.getPropertyValue
        ('--width')) || 0
        timerBar.style.setProperty('--width', width + .1)
}, 5)