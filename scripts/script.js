let miliseconds = 0
let step = 0
let activedCron = false

function toggleTimer1(){
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

function calculateNextStep(){
    const targetMeasure = document.querySelector('#targetMeasure').value
    const startMeasure = document.querySelector('#startMeasure').value
    const resultMeasure = document.querySelector('#resultMeasure').value
    const inputSeconds = document.querySelector('#inputSeconds').value
    const inputMinutes = document.querySelector('#inputMinutes').value

    const totalTimeInMs = convertInMiliseconds(inputSeconds, inputMinutes)

    if(!targetMeasure || !startMeasure || !resultMeasure || !totalTimeInMs){
        alert('preencha todos os campos!')
        return
    }

    const cutResult = resultMeasure - startMeasure 
    const remaingCut = targetMeasure - resultMeasure

    const timeToNextCut = (remaingCut * totalTimeInMs) / cutResult

    const formatedTimeNextcut = formatTime(timeToNextCut)[1]

    if (remaingCut <= 0){
        alert('Limite de corte atingido')
        return
    }

    const confirm = window.confirm (`Próximo passo sugerido: \n ${formatedTimeNextcut.minutes} minutos e ${formatedTimeNextcut.seconds} segundos\nDeseja utilizar?`)

    if(confirm){
        document.querySelector('#startMeasure').value = resultMeasure
        document.querySelector('#inputSeconds').value = formatedTimeNextcut.seconds
        document.querySelector('#inputMinutes').value = formatedTimeNextcut.minutes
    }

}