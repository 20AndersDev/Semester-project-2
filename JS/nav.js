

document.addEventListener('DOMContentLoaded', function() {
    const profileName = localStorage.getItem('name'); 
    const navName = document.getElementById('profile-name'); 

    if (profileName !== null) {
        navName.textContent = profileName; 
    } else {
        navName.textContent = 'Log in to start bidding';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const profileAvatar = localStorage.getItem('avatar');
    const navAvatar = document.getElementById('nav-img');

    if(profileAvatar !== null) {
        navAvatar.src = profileAvatar;
    } else {
        navAvatar.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const newListingElement = document.getElementById('newlisting');
    
    if (localStorage.getItem('token') !== null) {
        newListingElement.style.display = 'block';
    } else {
        newListingElement.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const profileCredits = localStorage.getItem('credits');
    const Credits = document.getElementById('credit-count');
    const creditIcon = document.getElementById('creditIcon');
    

    if (profileCredits !== null) {
        Credits.textContent =   profileCredits;
    } else {
        creditIcon.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const divbtn = document.getElementById('div-btns'); // Assuming 'div-btns' is the ID of the container div

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Log out';
    logoutButton.classList.add('btn', 'btn-danger', 'm-3');
    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = '/index.html';
    });

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Log in';
    loginButton.classList.add('btn', 'btn-primary', 'm-3');
    loginButton.addEventListener('click', function() {
        window.location.href = '/login/index.html';
    });

    if (localStorage.getItem('token') !== null) {
        divbtn.appendChild(logoutButton);
    } else {
        logoutButton.style.display = 'none';
        divbtn.appendChild(loginButton);
    }

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = '/index.html';
    });
});


const hamburgermenu = document.getElementById('hamburger');

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.s !== '/index.html') {
        hamburgermenu.style.display = 'none';
    }
});