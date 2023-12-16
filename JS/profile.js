
import  * as url from './api.js';

const singleUserUrl = url.singleUserUrl;
const bidUrl = url.profileBids;
const profileName = localStorage.getItem('name');

const profileUrl = singleUserUrl.replace('<name>', localStorage.getItem('name'));
const profileBidsUrl = bidUrl.replace('<name>', localStorage.getItem('name'));
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
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}


async function getBids() {
    try{
        const bids = await fetch(profileBidsUrl, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                }
        });
        const response = await bids.json();
        console.log(response);

    } catch (error) {
        console.log(error);
    }
}

getBids();

const profileContainer = document.getElementById('profile-info');
const avatarElement = document.getElementById('avatar-img');

function displayProfile(profile) {
    const profileName = profile.name;
    const avatar = profile.avatar;
 

    // Create new elements for each piece of profile data
    const nameElement = document.createElement('h3');
    nameElement.classList.add('profile-name');

    const avatarimg = document.createElement('img');
    avatarimg.classList.add('profile-avatar');

    // Set the text content of the elements to the profile data
    nameElement.textContent = ` ${profileName}`;
    avatarimg.src = avatar; // assuming avatar is a URL


    

    // Append the elements to the profileContainer
    avatarElement.appendChild(avatarimg);
    profileContainer.appendChild(nameElement);

}

getProfile().then(profile => {
    displayProfile(profile); 
});

document.addEventListener('DOMContentLoaded', function() {
    this.title = profileName +" | Profile";
});


