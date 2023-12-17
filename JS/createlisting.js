const createNewListing = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem('token');

const newListingForm = document.getElementById('newListingForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const mediaInput = document.getElementById('media');
const endsAtInput = document.getElementById('endsAt');

newListingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const endsAtDate = new Date(endsAtInput.value);
        if (isNaN(endsAtDate)) {
            throw new Error('Invalid date format for endsAt');
        }

        const endsAtISO = endsAtDate.toISOString();

        const response = await fetch(createNewListing, {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput.value,
                description: descriptionInput.value,
                media: [mediaInput].value, 
                endsAt: endsAtISO,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const listing = await response.json();

        if (response.ok) {
            const success = document.getElementById('success-message');
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Listing created successfully';
            successMessage.style.color = 'green';
            success.appendChild(successMessage);
            setTimeout(function () {
                window.location.href = "../index.html";
            }, 2000);
        } else {
            const ErrorMessage = document.createElement('p');
            ErrorMessage.textContent = 'Listing not created. Make sure the URL is correct and the Date is in the future';
            ErrorMessage.style.color = 'red';
            newListingForm.appendChild(ErrorMessage);
        }

        console.log(listing);

        titleInput.value = '';
        descriptionInput.value = '';
        mediaInput.value = '';
        endsAtInput.value = '';

    } catch (error) {
        console.error('Form submission error:', error.message);
    }
});
