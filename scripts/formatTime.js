function formatTime(miliseconds, object = false){
    const seconds = miliseconds/ 1000 
    const minutes = seconds/ 60

    const formatedSeconds = String (Math.round( (minutes - Math.floor (minutes)) * 60 )).padStart(2,'0')
    const formatedMinutes = String (Math.floor (minutes)).padStart(2, '0')

    const formatedTime = `${formatedMinutes} : ${formatedSeconds}`

    return [formatedTime, {
        minutes: Number(formatedMinutes),
        seconds: Number(formatedSeconds)
    }]

}