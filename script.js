function genCircle() {
    const count = parseInt(document.querySelector(".inpbx input").value);
    const svgCanvas = document.getElementById("circle-svg");
    svgCanvas.innerHTML = ''; // Clear existing circles

    if (count > 0 && count <= 10) {
        const spacing = 600 / (count + 1);
        const radius = 30;

        for (let i = 1; i <= count; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", spacing * i);
            circle.setAttribute("cy", 150);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "white");
            circle.setAttribute("stroke", "black");
            svgCanvas.appendChild(circle);
        }
    } else {
        alert("Enter a number between 1 and 10.");
    }
}
