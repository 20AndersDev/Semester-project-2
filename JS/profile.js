
import { METHODS } from 'http';
import  * as url from './api.js';

const singleUserUrl = url.singleUserUrl;
const bidUrl = url.profileBids;

const profileUrl = singleUserUrl.replace('<name>', localStorage.getItem('name'));
console.log(profileUrl);
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
        return response; // Return the response so it can be used later
    } catch (error) {
        console.log(error);
    }
}


async function profileBids(){
    try{
        method: 'GET',
        headers: {
            
        }
    }
}

function displayProfile(profile) {
    const profileName = profile.name;
    const avatar = profile.avatar;
    const listing = profile._count.listings;
    const credits = profile.credits;
    const 
    console.log(credits);
    console.log(listing);
    console.log(avatar);

    console.log(profileName);
}

getProfile().then(profile => {
    displayProfile(profile); // Call displayProfile with the fetched profile
});
