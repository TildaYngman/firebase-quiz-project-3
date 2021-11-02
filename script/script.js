//FUNCTION RestartTimerForNewQuestion
//IF new question is displayed restart timer
//END IF
//END FUNCTION

//FUNCTION timerReachZero
//IF Timer reaches 0 question is failed
//ENDIF
//END FUNCTION

function RestartTimer(){
    let timer = document.querySelector(.timer-bar)

}

function reset_animation() {
    var el = document.getElementById('animated');
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
 }