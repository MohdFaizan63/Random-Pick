let expectedTouchCount = 0;
let selected = false;
let touches = {}; 

function genCircle() {
    const count = parseInt(document.querySelector(".inpbx input").value);
    const svgCanvas = document.getElementById("circle-svg");
    svgCanvas.innerHTML = ''; 
    expectedTouchCount = count;
    touches = {};
    selected = false;

    if (!(count > 0 && count <= 10)) {
    alert("Enter a number between 1 and 10.");
    return; 
}

}


document.body.addEventListener('touchstart', (e) => {
    for (let t of e.changedTouches) {
        if (Object.keys(touches).length >= expectedTouchCount) return;

        const id = `touch-${t.identifier}`;
        if (touches[id]) return;

        
        const svgCanvas = document.getElementById("circle-svg");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", t.pageX);
        circle.setAttribute("cy", t.pageY);
        circle.setAttribute("r", 40);
        circle.setAttribute("fill", "white");
        circle.setAttribute("stroke", "black");
        circle.classList.add("touch-circle");
        circle.dataset.id = id;

        svgCanvas.appendChild(circle);
        touches[id] = circle;

   
        if (Object.keys(touches).length === expectedTouchCount && !selected) {
            selected = true;

            setTimeout(() => {
                const keys = Object.keys(touches);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                const circle = touches[randomKey];
                circle.classList.add("selected");
            }, 3000);
        }
    }
});
