import {render} from "./xrender.js";

const main = async () => {
    let catsElement = document.getElementById("cats");
    let template = await (await fetch("./templates/catCard.html")).text();
    for (let i = 0; i < 12; i++) {
        catsElement.appendChild(render(template, {
            filename: `cat${i}`
        }));
    }
}

window.addEventListener("load", main);
