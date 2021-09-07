export function render(template, context) {
    for (let variable in context) {
        template = template.replace(new RegExp(`{{\\s*${variable}\\s*}}`, "gm"), context[variable]);
    }
    if (template.match(/{{\s*[^}]\s*}}/)) {
        return null;
    }
    let divElement = document.createElement("div");
    divElement.innerHTML = template;
    return divElement.firstChild;

}

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
