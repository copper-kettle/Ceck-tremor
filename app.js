const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const time_list = document.querySelector('#time-list');
const time_elem = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;


startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
});

time_list.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
})




function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		fnishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current);
	}
}

function setTime(value) {
	time_elem.innerHTML = `00:${value}`;
}

function fnishGame() {
	time_elem.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Счет: <span class = "primary">${score}</span></h1>`;

}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60);
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, (width - size));
	const y = getRandomNumber(0, (height - size));

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;

	setColor(circle);

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
	const color = getRandomColor();
	element.style.background = color;
	}

function getRandomColor() {
	let symbol = '0123456789adcdef';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += symbol[Math.floor(Math.random() * 16)];
	}
	return color;
}