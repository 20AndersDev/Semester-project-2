// createlisting.js



const createNewListing = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem('token');

const newListingForm = document.getElementById('newListingForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const mediaInput = document.getElementById('media');
const endsAtInput = document.getElementById('endsAt');

newListingForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
        // Parse endsAt value to ISO format
        const endsAtISO = new Date(endsAtInput.value).toISOString();

        const response = await fetch(createNewListing, {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput.value,
                description: descriptionInput.value,
                media: mediaInput.value,
                endsAt: endsAtISO,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        try {
            const listing = await response.json();
            console.log(listing);
        } catch (error) {
            console.error('Error parsing JSON response:', await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
});
