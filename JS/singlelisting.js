
import * as url from '/JS/api.js';

let singlePostUrl = url.singlePostUrl;

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

singlePostUrl = singlePostUrl.replace('<id>', id);

console.log(singlePostUrl);


async function getSinglePost() {
    try {
        
        const response = await fetch(singlePostUrl);
        const post = await response.json();
        console.log(post);
    } catch (error) {
        console.log(error);
    }
}

getSinglePost();