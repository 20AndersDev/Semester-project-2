
import * as url from '/JS/api.js';

// Biddibg on a listing
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const bidURL = url.placeBid;
const newBidUrl = bidURL.replace('<id>', id);
const accessToken = localStorage.getItem('token');


const placeBid = async (amount) => {


    try {
        // Use the 'amount' parameter instead of a hardcoded value
        const response = await fetch(newBidUrl, {
            method: 'POST',
            body: JSON.stringify({
                amount: amount, // Use the provided bid amount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log(newBidUrl);
        const bid = await response.json();
        console.log(bid);
    } catch (error) {
        console.error(error);
        console.error(error.message);
    }
};


const singlePostURL = url.singlePostUrl;


const getSinglePost = async () => {
    try {
        const response = await fetch(singlePostURL.replace('<id>', id));
        const post = await response.json();
        displaySingleListing(post);
        console.log(post);
    } catch (error) {
        console.log(error);
    }
};

function displaySingleListing(listing) {

    const listingInfo = document.getElementById('listing-info');

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.textContent = listing.title; 
    listingInfo.appendChild(postTitle);


    const sellerinfo = document.createElement('div');
    sellerinfo.classList.add('seller-info','d-flex');

    const seller = document.createElement('h3');
    seller.classList.add('seller');
    seller.textContent = ` ${listing.seller.name}`;
    sellerinfo.appendChild(seller);

    const userAvatar = document.createElement('img');
    userAvatar.classList.add('singel-listing-avatar');
    userAvatar.src = listing.seller.avatar;
    sellerinfo.appendChild(userAvatar);

    listingInfo.appendChild(sellerinfo);


    const description = document.createElement('p');
    description.classList.add('single-description');
    description.textContent = listing.description;
    listingInfo.appendChild(description);

    let highestBidAmount = 0;
    listing.bids.forEach(bid => {
        if (bid.amount > highestBidAmount) {
            highestBidAmount = bid.amount;
        }
    });


    const highestBid = document.createElement('p');
    highestBid.classList.add('highestBid');
    highestBid.textContent = `Highest bid: ${highestBidAmount}$`;
    listingInfo.appendChild(highestBid);
    
    const endDate = document.createElement('p');
    endDate.classList.add('endDate');
    endDate.textContent = ` Bidding ends at: ${new Date(listing.endsAt).toLocaleString()}`;
    listingInfo.appendChild(endDate);

    const bidInput = document.createElement('input');
    bidInput.classList.add('bid-input');
    bidInput.type = 'number'; 
    bidInput.placeholder = 'Enter your bid amount';
    listingInfo.appendChild(bidInput);

    const bidButton = document.createElement('button');
    bidButton.classList.add('bid-button');
    bidButton.textContent = 'Place a bid';
    listingInfo.appendChild(bidButton);

    

    
if(accessToken == null) {
    bidButton.textContent = 'Login to place a bid';
    bidButton.addEventListener('click', () => {
        window.location.href = '/login/index.html';
    });
    bidInput.style.display = 'none';
} else{
    bidButton.textContent = 'Place a bid';
    bidInput.addEventListener('input', () => {
        bidInput.value = bidInput.value.replace(/[^0-9]/g, '');
    });

}

    if (new Date(listing.endsAt) < new Date()) {
        bidButton.disabled = true;
        bidButton.textContent = 'Bidding has ended';
        bidButton.style.backgroundColor = 'red';
        endDate.style.display = 'none';


        // Hide the bid input field
        bidInput.style.display = 'none';
    } else {
        bidButton.addEventListener('click', async () => {
            const bidAmount = parseFloat(bidInput.value); 
            if (!isNaN(bidAmount)) {
                await placeBid(bidAmount); 
                localStorage.setItem('credits', localStorage.getItem('credits') - bidAmount);
                window.location.reload();
            } else {
                console.error('Invalid bid amount');
            }
        });
    }
  
   

    
    
// Listing media and buttons
    const mediaContainer = document.getElementById('media-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');


    const images = listing.media;
    let currentImageIndex = 0;

    const postImage = document.createElement('img');
    postImage.classList.add('post-image');
    postImage.src = images[currentImageIndex]; 
    imageContainer.appendChild(postImage);
    mediaContainer.appendChild(imageContainer);

    
    const divBtn = document.createElement('div');
    divBtn.classList.add('div-btn');

    const nextImageButton = document.createElement('button');
    nextImageButton.classList.add('next-image-button');
    nextImageButton.textContent = 'Next Image';
    

    nextImageButton.addEventListener('click', () => {
        
        currentImageIndex = (currentImageIndex + 1) % images.length;
        postImage.src = images[currentImageIndex];
    });

    divBtn.appendChild(nextImageButton);
    mediaContainer.appendChild(divBtn);

   



// Lsiting bids displayed below the listing
    const bidInfo = document.getElementById('bidders');
    const bids = listing.bids;

    bids.forEach(bid => {
        const bidDiv = document.createElement('div');
        bidDiv.classList.add('bid-div', 'd-flex', 'justify-content-center');
    
        const bidUser = document.createElement('p');
        bidUser.classList.add('bid-user', 'p-4');
    
        // Create elements for the name and amount separately for styling
        const userName = document.createElement('span');
        userName.textContent = bid.bidderName;
        userName.style.fontWeight = 'bold'; // Style the name to be bold
    
        const bidText = document.createTextNode(' bidded '); // Text node for "bidded" (default color)
    
        const bidAmount = document.createElement('span');
        bidAmount.textContent = bid.amount + '$';
        bidAmount.style.color = 'green'; // Style the bid amount to be green
    
        const bidDate = document.createElement('span');
        bidDate.textContent = ' ' + new Date(bid.created).toLocaleString();
    
        // Append name, "bidded" text, amount, and date spans to the paragraph
        bidUser.appendChild(userName);
        bidUser.appendChild(bidText);
        bidUser.appendChild(bidAmount);
        bidUser.appendChild(bidDate);
    
        bidDiv.appendChild(bidUser);
    
        bidInfo.appendChild(bidDiv);
    });
    
    

    

    
    
     
    
}   

getSinglePost();

