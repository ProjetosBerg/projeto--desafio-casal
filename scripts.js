const homemGrid = document.getElementById('homem');
const mulherGrid = document.getElementById('mulher');
const totalElement = document.getElementById('total');
const totalHomemElement = document.getElementById('total-homem');
const totalMulherElement = document.getElementById('total-mulher');

let total = 0;
let totalHomem = 0;
let totalMulher = 0;

for (let i = 1; i <= 125; i++) {
    const cellHomem = document.createElement('div');
    cellHomem.id = `cell-homem-${i}`;
    cellHomem.className = 'cell';
    cellHomem.textContent = i;
    homemGrid.appendChild(cellHomem);
}

for (let i = 125; i >= 1; i--) {
    const cellMulher = document.createElement('div');
    cellMulher.id = `cell-mulher-${i}`;
    cellMulher.className = 'cell';
    cellMulher.textContent = i;
    mulherGrid.appendChild(cellMulher);
}

function loadColors() {
    for (let i = 1; i <= 125; i++) {
        const cellHomem = document.getElementById(`cell-homem-${i}`);
        const cellMulher = document.getElementById(`cell-mulher-${i}`);
        const colorHomem = localStorage.getItem(`cell-homem-${i}-color`);
        const colorMulher = localStorage.getItem(`cell-mulher-${i}-color`);
        if (colorHomem) {
            cellHomem.style.backgroundColor = colorHomem;
            if (colorHomem === 'lightblue') {
                totalHomem += i;
            }
        }
        if (colorMulher) {
            cellMulher.style.backgroundColor = colorMulher;
            if (colorMulher === 'orange') {
                totalMulher += i;
            }
        }
    }
    total = totalHomem + totalMulher;
    totalElement.textContent = total;
    totalHomemElement.textContent = totalHomem;
    totalMulherElement.textContent = totalMulher;
}

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        const cellValue = parseInt(this.textContent);
        if (this.id.startsWith('cell-homem-')) {
            if (this.style.backgroundColor === 'lightblue') {
                this.style.backgroundColor = '';
                totalHomem -= cellValue;
                total -= cellValue;
                localStorage.removeItem(`${this.id}-color`);
            } else {
                this.style.backgroundColor = 'lightblue';
                totalHomem += cellValue;
                total += cellValue;
                localStorage.setItem(`${this.id}-color`, 'lightblue');
            }
        } else if (this.id.startsWith('cell-mulher-')) {
            if (this.style.backgroundColor === 'orange') {
                this.style.backgroundColor = '';
                totalMulher -= cellValue;
                total -= cellValue;
                localStorage.removeItem(`${this.id}-color`);
            } else {
                this.style.backgroundColor = 'orange';
                totalMulher += cellValue;
                total += cellValue;
                localStorage.setItem(`${this.id}-color`, 'orange');
            }
        }
        totalElement.textContent = total;
        totalHomemElement.textContent = totalHomem;
        totalMulherElement.textContent = totalMulher;
    });
});

loadColors();
