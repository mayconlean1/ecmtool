let cron
const seconds = 1 * 1000

function startCron(fn= ()=>{}){
    cron = setInterval(()=>{
        fn()
    }, seconds)
}

function stopCron (){
    clearInterval(cron)
    
}

let miliseconds = 0
let step = 0
let activedCron = false

function toggleTimer(){
    if(activedCron){
        activedCron = false
        stopCron()

        document.querySelector('#toggleTimerButton').textContent = 'Inciar' 

    }else{
        activedCron = true
        document.querySelector('#toggleTimerButton').textContent = 'Pausar'

        const stepField = document.querySelector('#stepField')
        const timerField = document.querySelector('#timerField')
        const inputSeconds = document.querySelector('#inputSeconds').value
        const inputMinutes = document.querySelector('#inputMinutes').value

        const zeredTimer  = timerField.textContent.match(/[0][0]+/gi)
    
        if (zeredTimer && zeredTimer.length === 2){
            miliseconds =  convertInMiliseconds(inputSeconds, inputMinutes)
        }else{
            const [timerFieldMinutes, timerFieldSeconds] =  timerField.textContent.match(/\d+/gi)
            miliseconds =  convertInMiliseconds(timerFieldSeconds, timerFieldMinutes)
            console.log('else :>> ', miliseconds);
        }

        timerField.innerHTML = formatTime(miliseconds)[0]
        
        step++
        stepField.innerHTML = step
    
        startCron(()=>{
            miliseconds -= 1000
    
            timerField.innerHTML = formatTime(miliseconds)[0]
            if (miliseconds <= 0){
                stopCron()
                alert('Finalizado !')
            }
        })

    }

}

function stopTimer (){
    const confirm =  window.confirm('Deseja zerar o Cronômetro?')
    if (confirm){
        const timerField = document.querySelector('#timerField')
        miliseconds = 0
        timerField.innerHTML = formatTime(miliseconds)[0]
        stopCron()
    }
}

function clearStep (){
    const confirm =  window.confirm('Deseja zerar o Passo?')
    if (confirm){
        const stepField = document.querySelector('#stepField')
        stepField.innerHTML = 0

        step = 0 
    }
}