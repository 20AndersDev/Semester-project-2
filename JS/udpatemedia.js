
import * as url from "./api.js";

const mediaUrl = url.updateAvatar;
const updateMediaUrl = mediaUrl.replace('<name>', localStorage.getItem('name'));
const accessToken = localStorage.getItem("token");


async function updateMediaAPI(url, mediaElement) {
    try {
        const media = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ avatar: mediaElement })
        });
        const response = await media.json();
        return response;
    } catch (error) {
        return error;
    }
}

async function updateMedia() {
    const upload = document.getElementById('upload-btn');

    upload.addEventListener('click', async (event) => {
        event.preventDefault();
        const mediaElement = document.getElementById('input-media').value;
        const response = await updateMediaAPI(updateMediaUrl, mediaElement);
        localStorage.setItem('avatar', mediaElement);

        setTimeout(function() {
            window.location.href = "../profile/index.html";
        }, 1000);
        
    });
}

updateMedia();