function renderMain (){

    let lastInputs = null

    try {
        lastInputs = JSON.parse( localStorage.getItem('lastInputs'))
        for(i in lastInputs){}
    } catch (error) {
        lastInputs = null
    }

    const main = document.querySelector('main')

    console.log('lastInputs :>> ', lastInputs);

    main.innerHTML = `
    <div class="field">
        <h2>Nome do Processo</h2>
        <input id="processName" type="text" value="${lastInputs.processName}">
    </div>

    <div class="field">
        <h2>Medida Alvo</h2>
        <input id="targetMeasure" type="number" value="${lastInputs.targetMeasure}">
    </div>

    <div class="field">
        <h2>Medida Inicial</h2>
        <input id="startMeasure" type="number" value="${lastInputs.startMeasure}">
    </div>

    <div class="field">
        <h2>Tempo</h2>
        <div class="timeField">
            minutos : segundos
        </div>
        <div class="timeField">
            <input type="number" id="inputMinutes" value="${lastInputs.inputMinutes}"> : <input type="number" id="inputSeconds" value="${lastInputs.inputSeconds}">
        </div>
    </div>


    <div class="field">
        <h2>Valor medido</h2>
        <input id="resultMeasure" type="number" value="${lastInputs.resultMeasure}">
    </div>

    <div class="field">
        <button onclick="calculateNextStep()">Calcular</button>
    </div>

    <div class="field">
        <button onclick="RenderHistory()">Histórico</button>
    </div>
    `

    document.querySelector('#backButton').hidden = true
}
