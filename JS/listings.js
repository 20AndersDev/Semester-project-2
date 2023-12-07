import * as urls from "/JS/api.js"; 
const apiUrlAllListings = urls.apiUrlAllListings;

async function getAuctions() {
    try {
        const response = await fetch(apiUrlAllListings);
        const auctions = await response.json();
        displayAuctions(auctions);
        console.log(auctions);
    } catch (error) {
        console.log(error);
    }
}

function displayAuctions(auctions) {
    const container = document.querySelector('.post-container'); 
    auctions.forEach(auction => {
        const post = document.createElement('div');
        post.classList.add('post','mb-4');

        const media = document.createElement('div');
        media.classList.add('listing-media');
        const image = document.createElement('img');
        image.src = auction.media[0]; 
        image.classList.add('listing-media');
        media.appendChild(image);

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header','p-4');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = auction.title;
        postHeader.appendChild(title);

        const seller = document.createElement('h2');
        seller.classList.add('seller');
        seller.textContent = ` ${auction.seller.name}`;
        postHeader.appendChild(seller);

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.src = auction.seller.avatar;
        postHeader.appendChild(userAvatar); 

        const postContent = document.createElement('div');
        postContent.classList.add('post-content','p-4');

        const highestBid = document.createElement('p');
        highestBid.classList.add('highestBid');

       
        const lastBidIndex = auction.bids.length - 1; 
        highestBid.textContent = `Highest bid:  ${lastBidIndex} $`;
    

        const endDate = document.createElement('p');
        endDate.classList.add('endDate');
        endDate.textContent = ` Bidding ends at: ${new Date(auction.endsAt).toLocaleString()}`;

        postContent.appendChild(highestBid);
        postContent.appendChild(endDate);


        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        const bidButton = document.createElement('span');
        bidButton.textContent = 'Place a Bid';

        postFooter.appendChild(bidButton);

        post.appendChild(media);
        post.appendChild(postHeader);
        post.appendChild(postContent);
        post.appendChild(postFooter);

        container.appendChild(post);


        
        post.addEventListener('click', () => {
            window.location.href = '/single-Listing/index.html' + '?id=' + auction.id;
        });
    });

}

getAuctions();



const divProfile = document.getElementById('div-profile-name');
const profileName = document.getElementById('profile-name');
const newlisting = document.getElementById('div-new-listing');
const creditCount = document.getElementById('div-credit-amount');
const loginbtn = document.getElementById('login-btn');
const registerbtn = document.getElementById('register-btn');
const buttons = document.getElementById('div-btn');
const avatar = document.createElement('img');
avatar.classList.add('avatar-profile');
avatar.src = localStorage.getItem('avatar');


loginbtn.addEventListener('click', () => {
    window.location.href = '/login/index.html';
});

registerbtn.addEventListener('click', () => {
    window.location.href = '/register/index.html';
});

const logoutButton = document.createElement('button');
logoutButton.textContent = 'Logout';
logoutButton.classList.add('btn-danger');


logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('credits');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('avatar');
    window.location.href = '/index.html';
});





if (localStorage.getItem('token')) {
    profileName.textContent = localStorage.getItem('name');
    divProfile.appendChild(avatar);
    newlisting.style.display = 'block';
    creditCount.style.display = 'block';
    creditCount.textContent = "Credits: " + localStorage.getItem('credits');
    loginbtn.style.display = 'none';
    registerbtn.style.display = 'none';
    buttons.style.display = 'block'; 
    buttons.appendChild(logoutButton);
} else {
    profileName.textContent = 'Login or register below';
    newlisting.style.display = 'none';
    creditCount.style.display = 'none';
    loginbtn.style.display = 'block';
    registerbtn.style.display = 'block';
    buttons.style.display = 'block'; 
}
