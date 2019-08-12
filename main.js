let cells = [];
let container = document.querySelector("#container");
let colorMode = "black";


/*
 * DOM manipiulation
 */
function removeGrid() {
    if (cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].forEach(cell => {
                cell.remove();
            });
        }
    }
}

function createGrid(gridSize) {
    let containerWidth = window.getComputedStyle(container).getPropertyValue("width").slice(0, -2);
    let cellDimension = Math.floor(containerWidth / gridSize) + "px";


    for (let i = 0; i < gridSize; i++) {
        cells[i] = [];
        for (let j = 0; j < gridSize; j++) {
            cells[i][j] = document.createElement("div");
            cells[i][j].style.width = cellDimension;
            cells[i][j].style.height = cellDimension;
            cells[i][j].classList.add("cell");
            cells[i][j].style.backgroundColor = "rgb(255,255,255)";
            cells[i][j].addEventListener("mouseenter", changeBackgroundColor);

            container.appendChild(cells[i][j]);

            if (j === 0) {
                cells[i][j].style.borderLeft = "1px solid black";
            }
            if (i === gridSize - 1) {
                cells[i][j].style.borderBottom = "1px solid black";
            }
        }
    }
}

function resetGridColor() {
    if (cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].forEach(cell => {
                cell.style.backgroundColor = "rgb(255,255,255)";
            });
        }
    }
}

function changeBackgroundColor() {
    let backgroundColor;
    switch (colorMode) {
        case "rainbow":
            backgroundColor = randomColor();
            break;
        case "shade":
            backgroundColor = darkenRGB(window.getComputedStyle(this).backgroundColor);
            break;
        case "black":
            backgroundColor = "black";
            break;
        default:
            backgroundColor = "black";
    }
    this.style.backgroundColor = backgroundColor;
}

/*
 * Event Listeners for buttons
 */

document.getElementById("new-grid").addEventListener("click", function () {
    let gridSize;
    do {
        gridSize = +prompt("Enter a new grid size. Maximum size: 200x200");
    } while (!gridSize || gridSize < 0 || gridSize > 200);

    removeGrid();
    createGrid(gridSize);
});

document.getElementById("rainbow").addEventListener("click", () => {
    colorMode = "rainbow";
    resetGridColor();
});

document.getElementById("shade").addEventListener("click", () => {
    colorMode = "shade";
    if (cells.length > 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].forEach(cell => {
                cell.style.backgroundColor = "hsl(120,0%,100%)";
            });
        }
    }
});

document.getElementById("black").addEventListener("click", () => {
    colorMode = "black";
    resetGridColor();
});



/*
 * Helper functions
 */
function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randomColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`;
}

function darkenRGB(color) {
    let red, green, blue;
    [, red, green, blue] = color.match(/rgb\((\d+), (\d+), (\d+)\)/);

    red /= 255;
    green /= 255;
    blue /= 255;

    let colorMax = Math.max(red, green, blue);
    let colorMin = Math.min(red, green, blue);

    let lightness = (colorMax + colorMin) / 2;

    lightness >= 0.1 ? lightness -= 0.1 : 0;

    /*
    ! Calculate only lightness, because 
    ! It should display shades of gray
    ! and then the hue doesn't matter
    ! because it's saturation would be 0%
    */
    return `hsl(120,0%,${lightness * 100}%)`;
}




function initialize() {
    colorMode = "black";
    createGrid(16);
}

initialize();