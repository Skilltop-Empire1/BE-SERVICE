const generatePassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789"
    let password = "";
    for(i = 0; i < 6; i++){
        let randomIndex = Math.floor(Math.random()*characters.length)
        password += characters[randomIndex]
    }
    return password
}

module.exports = {generatePassword}