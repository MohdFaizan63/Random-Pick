let touches = {};
    let selected = false;
    let expectedTouchCount = 0;

    function genCircle() {
      const count = parseInt(document.querySelector(".inpbx input").value);
      const svgCanvas = document.getElementById("circle-svg");
      svgCanvas.innerHTML = ''; // Clear existing circles
      expectedTouchCount = count;
      touches = {}; // reset
      selected = false;

      if (count > 0 && count <= 10) {
        const spacing = window.innerWidth / (count + 1);
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

    document.body.addEventListener('touchstart', (e) => {
      for (let t of e.changedTouches) {
        if (Object.keys(touches).length >= expectedTouchCount) break;

        const el = document.createElement('div');
        el.classList.add('touch-point');
        el.style.left = `${t.pageX}px`;
        el.style.top = `${t.pageY}px`;
        el.id = `touch-${t.identifier}`;
        document.body.appendChild(el);
        touches[t.identifier] = el;
      }

      if (Object.keys(touches).length === expectedTouchCount && !selected) {
        selected = true;
        setTimeout(() => {
          const keys = Object.keys(touches);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          touches[randomKey].classList.add('selected');
        }, 1000);
      }
    });

    document.body.addEventListener('touchmove', (e) => {
      for (let t of e.changedTouches) {
        const el = touches[t.identifier];
        if (el) {
          el.style.left = `${t.pageX}px`;
          el.style.top = `${t.pageY}px`;
        }
      }
    });

    document.body.addEventListener('touchend', (e) => {
      for (let t of e.changedTouches) {
        const el = touches[t.identifier];
        if (el) {
          el.remove();
          delete touches[t.identifier];
        }
      }
      selected = false;
    });
