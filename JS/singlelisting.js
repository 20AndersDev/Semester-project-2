
import * as url from '/JS/api.js';

let singlePostUrl = url.singlePostUrl;


const accessToken = localStorage.getItem('token');
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

singlePostUrl = singlePostUrl.replace('<id>', id);





async function getSinglePost() {
    try {
        const response = await fetch(singlePostUrl);
        const post = await response.json();
        displaySingleListing(post); 
        console.log(post);
    } catch (error) {
        console.log(error);
    }
}

function displaySingleListing(listing) {
    const mediaContainer = document.getElementById('media-container');
    const listingInfo = document.getElementById('listing-info');
    const bidInfo = document.getElementById('bid-div');

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

    // Create the element to display the highest bid amount
    const highestBid = document.createElement('p');
    highestBid.classList.add('highestBid');
    highestBid.textContent = `Highest bid: ${highestBidAmount}$`;
    listingInfo.appendChild(highestBid);
    
    const endDate = document.createElement('p');
    endDate.classList.add('endDate');
    endDate.textContent = ` Bidding ends at: ${new Date(listing.endsAt).toLocaleString()}`;
    listingInfo.appendChild(endDate);


    

    const images = listing.media;
    let currentImageIndex = 0; 

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const postImage = document.createElement('img');
    postImage.classList.add('post-image');
    postImage.src = images[currentImageIndex]; 
    imageContainer.appendChild(postImage);
    mediaContainer.appendChild(imageContainer);

    

    const nextImageButton = document.createElement('button');
    nextImageButton.classList.add('next-image-button');
    nextImageButton.textContent = 'Next Image';
    mediaContainer.appendChild(nextImageButton);

    nextImageButton.addEventListener('click', () => {
        
        currentImageIndex = (currentImageIndex + 1) % images.length;
        postImage.src = images[currentImageIndex];
    });




   
    const bids = listing.bids;

    bids.forEach(bid => {
        const bidDiv = document.createElement('div');
        bidDiv.classList.add('bid-div','d-flex','justify-content-between');

        const bidUser = document.createElement('h4');
        bidUser.classList.add('bid-user','p-4');
        bidUser.textContent = bid.bidderName + ' bidded ' + bid.amount + '$';
        bidDiv.appendChild(bidUser);
      

        const bidTime = document.createElement('h4');
        bidTime.classList.add('bid-time');
        bidTime.textContent = new Date(bid.created).toLocaleString();
        bidDiv.appendChild(bidTime);

        bidInfo.appendChild(bidDiv);
    });

    

    
    
     
    
}   

getSinglePost();
