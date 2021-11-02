
//FUNCTION timerReachZero
//IF Timer reaches 0 question is failed
//ENDIF
//END FUNCTION

function restartTimer(){
    var shrinkingTimerBar = document.querySelector(".shrinking-timer-bar");
    shrinkingTimerBar.style.animation = 'none';
    shrinkingTimerBar.offsetHeight; /* trigger reflow */
    shrinkingTimerBar.style.animation = null; 
}