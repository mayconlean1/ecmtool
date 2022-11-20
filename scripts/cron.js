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