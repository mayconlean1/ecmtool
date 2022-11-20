function convertInMiliseconds(inputSeconds, inputMinutes){
    const secondsToMiliseconds = Number (inputSeconds? inputSeconds : 0) * 1000
    const minutesToMiliseconds = Number (inputMinutes? inputMinutes : 0) *60 * 1000
    return secondsToMiliseconds + minutesToMiliseconds
}