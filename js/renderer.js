document.querySelector("div.winButton#minimize").addEventListener("click", () => {
    window.winControl.minimize()
})

document.querySelector("div.winButton#maximize").addEventListener("click", () => {
    window.winControl.maximize()
})

document.querySelector("div.winButton#exit").addEventListener("click", () => {
    window.winControl.exit()
})

function cycleTabs(step){
    const tabs = document.querySelectorAll("div.tabButton")
    for(let i=0; i<tabs.length; i++){
        let j = i+step;
        if(j == tabs.length) j=0;
        if(j < 0) j=tabs.length-1;
        if(tabs[i].classList.contains("w3-blue-gray")){
            const mod = checkHidden(tabs, j, step);
            setTab(tabs[j+mod], match(tabs[j+mod].innerHTML))
            break;
        }
    }
}

function checkHidden(list, index, step){
    for(let i = index; i<list.length; step < 0 ? i-- : i++){
        if(list[i].classList.contains("hidden")) continue;
        return i-index;
    }
}

function match(value){
    let tab = value.toLowerCase();

    if(tab == "amulet") tab = "rebirth";

    return tab;
}

document.addEventListener("keydown", (e) => {
    switch(e.code){
        case "Space":
            setPause()
            break;
        case "Tab":
            e.preventDefault()
            if(e.altKey) break;
            e.shiftKey ? cycleTabs(-1) : cycleTabs(1);
            break;
        case "KeyE":
            cycleTabs(1)
            break;
        case "KeyQ":
            cycleTabs(-1)
            break;
    }
})