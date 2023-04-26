// Oyun alanı özellikleri
const canvasWidth = 800;
const canvasHeight = 600;

// Meyve resimleri
const fruitImages = [
	{ src: "../img/apple.png", width: 50, height: 50 },
	{ src: "../img/banana.png", width: 50, height: 50 },
	{ src: "../img/orange.png", width: 50, height: 50 },
	{ src: "../img/pear.png", width: 50, height: 50 }
];

// Oyun özellikleri
let score = 0;
let fruitsCollected = 0;
let gameRunning = true;
let fruits = [];

// Canvas hazırlığı
const canvas = document.getElementById("gameCanvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

// Klavye hareketleri
document.addEventListener("keydown", handleKeyDown);

// Fare tıklamaları
canvas.addEventListener("mousedown", handleMouseDown);

// Ana oyun döngüsü
setInterval(gameLoop, 1000/60);

function gameLoop() {
	// Oyun alanı temizleme
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	// Meyveleri ekrana çizme
	for (let i = 0; i < fruits.length; i++) {
		const fruit = fruits[i];
		ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.width, fruit.height);
	}

	// Puanı ve toplam meyve sayısını güncelleme
	document.getElementById("scoreDiv").innerText = "Score: " + score + " / " + fruitsCollected;

	// Yeni meyve oluşturma
	if (fruits.length < 10 && Math.random() < 0.05) {
		const fruitImage = fruitImages[Math.floor(Math.random() * fruitImages.length)];
		fruits.push({
			image: new Image(),
			x: Math.random() * (canvasWidth - fruitImage.width),
			y: Math.random() * (canvasHeight - fruitImage.height),
			width: fruitImage.width,
			height: fruitImage.height
		});
		fruits[fruits.length - 1].image.src = fruitImage.src;
	}

	// Oyun bitiş kontrolü
	if (score >= 20) {
		gameRunning = false;
        gameOver();
          
	}
}

function handleKeyDown(e) {
	// Yön tuşları ile hareket
	if (e.keyCode === 37) { // Sol tuş
		moveFruits(-10, 0);
	}
	if (e.keyCode === 38) { // Yukarı tuş
		moveFruits(0, -10);
	}
	if (e.keyCode === 39) { // Sağ tuş
		moveFruits(10, 0);
	}
	if (e.keyCode === 40) { // Aşağı tuş
		moveFruits(0, 10);
    }
    // Space tuşu ile meyve toplama
if (e.keyCode === 32) { // Space tuşu
	for (let i = 0; i < fruits.length; i++) {
		const fruit = fruits[i];
		if (isColliding(fruit, getPlayer())) {
			score++;
			fruits.splice(i, 1);
			fruitsCollected++;
			break;
		}
	}
}
}

function handleMouseDown(e) {
// Fare tıklaması ile meyve toplama
for (let i = 0; i < fruits.length; i++) {
const fruit = fruits[i];
if (isColliding(fruit, { x: e.offsetX, y: e.offsetY, width: 1, height: 1 })) {
score++;
fruits.splice(i, 1);
fruitsCollected++;
break;
}
}
}

function moveFruits(dx, dy) {
for (let i = 0; i < fruits.length; i++) {
const fruit = fruits[i];
fruit.x += dx;
fruit.y += dy;
}
}

function getPlayer() {
return {
x: canvasWidth / 2 - 25,
y: canvasHeight / 2 - 25,
width: 50,
height: 50
};
}

function gameOver() {
    document.getElementById("game-over").innerHTML = "Tebrikler! Oyunu kazandınız!";
  }
  

function isColliding(obj1, obj2) {
return (
obj1.x < obj2.x + obj2.width &&
obj1.x + obj1.width > obj2.x &&
obj1.y < obj2.y + obj2.height &&
obj1.y + obj1.height > obj2.y
);
}
