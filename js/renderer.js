document.querySelector("div.winButton#minimize").addEventListener("click", () => {
    window.winControl.minimize()
})

document.querySelector("div.winButton#maximize").addEventListener("click", () => {
    window.winControl.maximize()
})

document.querySelector("div.winButton#exit").addEventListener("click", () => {
    window.winControl.exit()
})