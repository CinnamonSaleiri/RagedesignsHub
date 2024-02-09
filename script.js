// Check if localStorage contains portfolios
if (!localStorage.getItem('portfolios')) {
    localStorage.setItem('portfolios', JSON.stringify([]));
}

// Function to display portfolios
function displayPortfolios() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = ''; // Clear previous list

    const portfolios = JSON.parse(localStorage.getItem('portfolios'));
    portfolios.forEach((portfolio, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
            <h3>${portfolio.title}</h3>
            <p>${portfolio.description}</p>
            <img src="${portfolio.imageUrl}" alt="Portfolio Image" class="portfolio-image">
            <p><strong>Discord Handle:</strong> ${portfolio.discordHandle}</p>
            <button class="editBtn" data-index="${index}">Edit</button>
        `;
        portfolioList.appendChild(portfolioItem);
    });

    // Add event listeners for edit buttons
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editPortfolio(index);
        });
    });
}

// Display portfolios when the page loads
displayPortfolios();

// Upload Portfolio button click event
document.getElementById('uploadBtn').addEventListener('click', function() {
    document.getElementById('portfolioFormModal').style.display = 'block';
});

// Close modal button click event
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('portfolioFormModal').style.display = 'none';
});

// Form submission event
document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const discordHandle = document.getElementById('discordHandle').value.trim();
    const portfolioTitle = document.getElementById('portfolioTitle').value.trim();
    const portfolioDescription = document.getElementById('portfolioDescription').value.trim();
    const portfolioImage = document.getElementById('portfolioImage').value.trim();

    if (discordHandle !== '' && portfolioTitle !== '' && portfolioDescription !== '' && portfolioImage !== '') {
        const portfolios = JSON.parse(localStorage.getItem('portfolios'));
        portfolios.push({
            discordHandle,
            title: portfolioTitle,
            description: portfolioDescription,
            imageUrl: portfolioImage
        });
        localStorage.setItem('portfolios', JSON.stringify(portfolios));
        displayPortfolios();
        document.getElementById('portfolioFormModal').style.display = 'none';
        document.getElementById('discordHandle').value = '';
        document.getElementById('portfolioTitle').value = '';
        document.getElementById('portfolioDescription').value = '';
        document.getElementById('portfolioImage').value = '';
    }
});

// Function to edit portfolio
function editPortfolio(index) {
    const portfolios = JSON.parse(localStorage.getItem('portfolios'));
    const editedDiscordHandle = prompt('Enter your new Discord handle:');
    if (editedDiscordHandle !== null && editedDiscordHandle.trim() !== '') {
        portfolios[index].discordHandle = editedDiscordHandle.trim();
        localStorage.setItem('portfolios', JSON.stringify(portfolios));
        displayPortfolios();
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7VCsMbDmq0gxfmK4_K0tbarUS1qGY7As",
  authDomain: "rhr-designs.firebaseapp.com",
  projectId: "rhr-designs",
  storageBucket: "rhr-designs.appspot.com",
  messagingSenderId: "519202489565",
  appId: "1:519202489565:web:5e7b428cf3724c253dc734",
  measurementId: "G-0190Y42LEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);