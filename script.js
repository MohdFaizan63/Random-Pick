let expectedTouchCount = 0;
let touchedCircles = new Set();
let selected = false;

function genCircle() {
    const count = parseInt(document.querySelector(".inpbx input").value);
    const svgCanvas = document.getElementById("circle-svg");
    svgCanvas.innerHTML = '';
    expectedTouchCount = count;
    touchedCircles.clear();
    selected = false;

    if (count > 0 && count <= 10) {
        const spacing = window.innerWidth / (count + 1);
        const radius = 40;

        for (let i = 1; i <= count; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", spacing * i);
            circle.setAttribute("cy", 150);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", "white");
            circle.setAttribute("stroke", "black");
            circle.dataset.index = i;
            circle.classList.add("circle-member");

            // Touch event
            circle.addEventListener('touchstart', (e) => {
                if (!touchedCircles.has(i)) {
                    touchedCircles.add(i);
                    circle.classList.add("touched");

                    if (touchedCircles.size === expectedTouchCount && !selected) {
    selected = true;

    // Show loading or wait 3 seconds before selecting
    setTimeout(() => {
        const touchedArray = Array.from(touchedCircles);
        const randomIndex = touchedArray[Math.floor(Math.random() * touchedArray.length)];

        const allCircles = document.querySelectorAll(".circle-member");
        allCircles.forEach(c => {
            if (parseInt(c.dataset.index) === randomIndex) {
                c.classList.add("selected");
            }
        });
    }, 5000); // ⏱ 3 second delay


                    }
                }
            });

            svgCanvas.appendChild(circle);
        }
    } else {
        alert("Enter a number between 1 and 10.");
    }
}
