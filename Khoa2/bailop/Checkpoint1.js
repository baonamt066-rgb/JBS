
const cards = [
    { name: 'image 1', img: 'https://instandeebinhthanh.com/wp-content/uploads/2024/11/anh-meme--878x1024.jpg' },
    { name: 'image 1', img: 'https://instandeebinhthanh.com/wp-content/uploads/2024/11/anh-meme--878x1024.jpg' },

    { name: 'image 2', img: 'https://gacbepbamien.com/wp-content/uploads/2026/01/Anh-Meme-15.jpg' },
    { name: 'image 2', img: 'https://gacbepbamien.com/wp-content/uploads/2026/01/Anh-Meme-15.jpg' },
    
    { name: 'image 3', img: 'https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/meme-cuoi-8.jpg' },
    { name: 'image 3', img: 'https://cdn-media.sforum.vn/storage/app/media/ctv_seo3/meme-cuoi-8.jpg' },

    { name: 'image 4', img: 'https://bom.edu.vn/public/upload/2024/12/avatar-meme-cute-3.webp' },
    { name: 'image 4', img: 'https://bom.edu.vn/public/upload/2024/12/avatar-meme-cute-3.webp' },

    { name: 'image 5', img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-cuoi-20.jpg' },
    { name: 'image 5', img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-cuoi-20.jpg' },

    { name: 'image 6', img: 'https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/anh-meme-4.jpg' },
    { name: 'image 6', img: 'https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/anh-meme-4.jpg' }
];


cards.sort(() => 0.5 - Math.random());


const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');

let chosenNames = [];
let chosenIds = [];
let score = 0;
let lock = false;

function createBoard() {
    for (let i = 0; i < cards.length; i++) {
        const img = document.createElement('img');
        img.src = 'images/blank.png';
        img.setAttribute('data-id', i);
        img.addEventListener('click', flipCard);
        grid.appendChild(img);
    }
}

createBoard();

function flipCard() {
    if (lock) return;

    const cardId = this.getAttribute('data-id');
    if (chosenIds.includes(cardId)) return;

    this.src = cards[cardId].img;
    chosenNames.push(cards[cardId].name);
    chosenIds.push(cardId);

    if (chosenNames.length === 2) {
        lock = true;
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const allCards = document.querySelectorAll('.grid img');
    const firstId = chosenIds[0];
    const secondId = chosenIds[1];

    if (chosenNames[0] === chosenNames[1] && firstId !== secondId) {
        alert('🎉 Đúng rồi!');

        allCards[firstId].style.visibility = 'hidden';
        allCards[secondId].style.visibility = 'hidden';

        allCards[firstId].removeEventListener('click', flipCard);
        allCards[secondId].removeEventListener('click', flipCard);

        score++;
        scoreDisplay.textContent = score;
    } else {
        alert('❌ Sai rồi!');
        allCards[firstId].src = 'images/blank.png';
        allCards[secondId].src = 'images/blank.png';
    }

    chosenNames = [];
    chosenIds = [];
    lock = false;
}
