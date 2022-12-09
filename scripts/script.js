
function calculateNextStep(){

    const processName = document.querySelector('#processName').value
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

    saveInputs({
        processName,
        targetMeasure, 
        startMeasure, 
        resultMeasure, 
        inputSeconds, 
        inputMinutes
    })

    if (remaingCut <= 0){
        alert('Limite de corte atingido')
        return
    }

    const confirm = window.confirm (`Próximo passo sugerido: \n ${formatedTimeNextcut.minutes} minutos e ${formatedTimeNextcut.seconds} segundos\nDeseja utilizar?`)

    if(confirm){
        document.querySelector('#startMeasure').value = resultMeasure
        document.querySelector('#inputSeconds').value = formatedTimeNextcut.seconds
        document.querySelector('#inputMinutes').value = formatedTimeNextcut.minutes
        document.querySelector('#resultMeasure').value = null
    }

    function saveInputs(values = {}){
        const processName = (values.processName ? values.processName : 'process').replace(/ /gi, '')

        const handledHistory =   JSON.stringify( handleHistory() )

        localStorage.setItem(processName, handledHistory)
        
        function handleHistory(){
            
        const localStorageHistory = localStorage.getItem(processName)
        const parsedHistory = localStorageHistory? JSON.parse(localStorageHistory) : []

            let history = parsedHistory
                    
            const filtredValues = {...values}
            delete filtredValues.processName

            history.push({...filtredValues})
            return history
            
        }
    }

}



