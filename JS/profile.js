
import  * as url from './api.js';

const singleUserUrl = url.singleUserUrl;
const profileName = localStorage.getItem('name');

const profileUrl = singleUserUrl.replace('<name>', localStorage.getItem('name'));
const accessToken = localStorage.getItem('token');

async function getProfile() {
    try {
        const profile = await fetch(profileUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                }
        });
        const response = await profile.json();
        return response;
    } catch (error) {
        return error;
    }
}



const profileContainer = document.getElementById('profile-info');
const avatarElement = document.getElementById('avatar-img');

function displayProfile(profile) {
    const profileName = profile.name;
    const avatar = profile.avatar;
 

    const nameElement = document.createElement('h3');
    nameElement.classList.add('profile-name');

    const avatarimg = document.createElement('img');
    avatarimg.classList.add('profile-avatar');

    nameElement.textContent = ` ${profileName}`;
    avatarimg.src = avatar; 


    

    avatarElement.appendChild(avatarimg);
    profileContainer.appendChild(nameElement);

    const tabListings = document.getElementById('listings');
    const listings = profile.listings;

    listings.forEach(listing => {
        const post = document.createElement('div');
        post.classList.add('post','mb-4');

        const media = document.createElement('div');
        media.classList.add('listing-media');
        const image = document.createElement('img');
        
        if (listing.media.length > 0) {
            image.src = listing.media[0];
            image.classList.add('listing-media');
            image.alt = 'Listing image';
            media.appendChild(image);
        
            if (listing.media.length > 1) {
                const noImage = document.createElement('div');
                noImage.classList.add('no-image');
                noImage.textContent = `+${listing.media.length - 1}`;
                media.appendChild(noImage);
            }
        } else {
            const noImageMessage = document.createElement('div');
            noImageMessage.classList.add('d-flex', 'align-items-center', 'justify-content-center','flex-column');
            const noimageicon = document.createElement('i');
            noimageicon.classList.add('fa-solid', 'fa-heart-crack', 'fa-5x');
            noImageMessage.classList.add('no-image');
            noImageMessage.textContent = 'No image found';
            noImageMessage.appendChild(noimageicon);
            media.appendChild(noImageMessage);
        }

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header','p-4');

        const sellerInfo = document.createElement('div');
        sellerInfo.classList.add('seller-info','d-flex','align-items-center');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = listing.title;
        postHeader.appendChild(title);

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.alt = 'profile picture';
        userAvatar.src = localStorage.getItem('avatar');
        sellerInfo.appendChild(userAvatar); 

        postHeader.appendChild(sellerInfo);

        const postContent = document.createElement('div');
        postContent.classList.add('post-content','p-4');


        const endDate = document.createElement('p');
        endDate.classList.add('endDate');
        endDate.textContent = ` Bidding ends at: ${new Date(listing.endsAt).toLocaleString()}`;

        if(new Date(listing.endsAt) < new Date()) {
            endDate.textContent = 'Bidding has ended';
            endDate.style.backgroundColor = 'red';
        }

        

        postContent.appendChild(endDate);



        post.appendChild(media);
        post.appendChild(postHeader);
        post.appendChild(postContent);

        tabListings.appendChild(post);


        
        post.addEventListener('click', () => {
            window.location.href = '/single-Listing/index.html' + '?id=' + listing.id;
        });
    });

}

getProfile().then(profile => {
    displayProfile(profile); 
});

document.addEventListener('DOMContentLoaded', function() {
    this.title = profileName +" | Auctionzone";
});





