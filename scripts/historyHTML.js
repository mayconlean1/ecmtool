function RenderHistory(){
    const processName = document.querySelector('#processName').value.replace(/ /gi, '')
    const targetMeasure = document.querySelector('#targetMeasure').value
    const startMeasure = document.querySelector('#startMeasure').value
    const resultMeasure = document.querySelector('#resultMeasure').value
    const inputSeconds = document.querySelector('#inputSeconds').value
    const inputMinutes = document.querySelector('#inputMinutes').value

    localStorage.setItem('lastInputs', JSON.stringify({
        processName, targetMeasure, startMeasure, resultMeasure, inputSeconds, inputMinutes
    }))

    
    function createTrHistory (){
        const history = JSON.parse( localStorage.getItem(processName) )
        let tr = ``
        try {
            history.forEach((h, i)=>{
                const minutes = h.inputMinutes.padStart(2 , '0')
                const seconds = h.inputSeconds.padStart(2, '0')
                
                tr += `
                <tr>
                    <th>${i+1}</th>
                    <th>${h.targetMeasure}</th>
                    <th>${h.startMeasure}</th>
                    <th>${h.resultMeasure}</th>
                    <th>${minutes} : ${seconds}</th>
                </tr>
                `
            })
        } catch (error) {
            tr = 'Sem historico'
        }

        return tr

    }

    const main = document.querySelector('main')
    main.innerHTML = `
    <div id="clearHistoryButton">
        <button onclick="clearHistory('${processName}')">Limpar</button>
    </div>
    <div class="fied">

        <h2>
            ${processName}
        </h2>

        <table >
            <tr>
                <th class="titleTh">Passo</th>
                <th class="titleTh">Medida Alvo</th>
                <th class="titleTh">Medida Incial</th>
                <th class="titleTh">Medida Final</th>
                <th class="titleTh">Tempo</th>
                
            </tr>
            ${createTrHistory()}
            
        </table>
        
    </div>
    `

    document.querySelector('#backButton').hidden = false
    
    
}

function clearHistory(processName){
    
    try {
        lastInputs = JSON.parse( localStorage.getItem('lastInputs'))
        for(i in lastInputs){}
        localStorage.removeItem(processName)
    } catch (error) {
        
    }

    renderMain ()

}