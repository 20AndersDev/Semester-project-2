
import * as url from '/JS/api.js';

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const bidURL = url.placeBid;
const newBidUrl = bidURL.replace('<id>', id);
const accessToken = localStorage.getItem('token');


const placeBid = async (amount) => {


    try {
        const response = await fetch(newBidUrl, {
            method: 'POST',
            body: JSON.stringify({
                amount: amount, 
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

    } catch (error) {
       return error;
    }
};


const singlePostURL = url.singlePostUrl;


const getSinglePost = async () => {
    try {
        const response = await fetch(singlePostURL.replace('<id>', id));
        const post = await response.json();
        displaySingleListing(post);
    } catch (error) {
        return
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

    if (listing.seller.avatar === null) {
        const defaultAvatar = localStorage.getItem('defaultavatar');
        userAvatar.src = defaultAvatar;
    } else {
        userAvatar.src = listing.seller.avatar;
    }

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

    const divdeletebtn = document.getElementById('DivdeleteBtn');
    const deleteButton = document.getElementById('delete-button');
    divdeletebtn.classList.add('d-flex', 'justify-content-center');

    const bidInputamount = document.querySelector('.bid-input');

    if(listing.seller.name === localStorage.getItem('name')) {
        bidButton.style.display = 'none';
        deleteButton.style.display = 'block';
        bidInputamount.style.display = 'none';
    
    } else {   
        bidButton.style.display = 'block';
        deleteButton.style.display = 'none';
        bidInputamount.style.display = 'block';
    }
    

    
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


        bidInput.style.display = 'none';
    } else {
        bidButton.addEventListener('click', async () => {
            const bidAmount = parseFloat(bidInput.value); 
        
            if (!isNaN(bidAmount)) {
                if (bidAmount > parseFloat(localStorage.getItem('credits'))) {
                    const errorContainer = document.getElementById('div-error-container');
                    errorContainer.innerHTML = ''; 
        
                    const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'You do not have enough credits for this bid.';
                    errorContainer.appendChild(errorMessage);
                } else if ( bidAmount <= highestBidAmount) {
                    const errorContainer = document.getElementById('div-error-container');
                    errorContainer.innerHTML = ''; 
        
                    const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Your bid must be higher than the current highest bid.';
                    errorContainer.appendChild(errorMessage);
                }
                else {
                    await placeBid(bidAmount); 
                    localStorage.setItem('credits', localStorage.getItem('credits') - bidAmount);
                    window.location.reload();
                }
            } else {
                const errorContainer = document.getElementById('div-error-container');
                errorContainer.innerHTML = ''; 
        
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Invalid bid amount.';
                errorContainer.appendChild(errorMessage);
            }
        });
        
    }
  
   

    
    
const mediaContainer = document.getElementById('media-container');
const images = listing.media;
let currentImageIndex = 0;

if (images.length > 0) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

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
} else {
    const noImageMessage = document.createElement('div');
    noImageMessage.classList.add('no-image-message');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-heart-crack', 'fa-5x'); 
    noImageMessage.appendChild(icon);

   
    const messageText = document.createElement('p');
    messageText.textContent = 'No image found';
    noImageMessage.appendChild(messageText);

    mediaContainer.appendChild(noImageMessage);
}
   

    const bidInfo = document.getElementById('bidders');
    const bids = listing.bids;

    bids.forEach(bid => {
        const bidDiv = document.createElement('div');
        bidDiv.classList.add('bid-div', 'd-flex', 'justify-content-center');
    
        const bidUser = document.createElement('p');
        bidUser.classList.add('bid-user', 'p-4');
    
       
        const userName = document.createElement('span');
        userName.textContent = bid.bidderName;
        userName.style.fontWeight = 'bold'; 
    
        const bidText = document.createTextNode(' bidded '); 
    
        const bidAmount = document.createElement('span');
        bidAmount.textContent = bid.amount + '$';
        bidAmount.style.color = 'green'; 
    
        const bidDate = document.createElement('span');
        bidDate.textContent = ' ' + new Date(bid.created).toLocaleString();
    
        bidUser.appendChild(userName);
        bidUser.appendChild(bidText);
        bidUser.appendChild(bidAmount);
        bidUser.appendChild(bidDate);
    
        bidDiv.appendChild(bidUser);
    
        bidInfo.appendChild(bidDiv);
    });
    
    

    

    
    
     
    
}   

getSinglePost();



const listingid = queryParams.get('id');

const deleteUrl = url.deleteListing.replace("<id>", listingid);

async function deleteListing() {
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const listing = await response.json();
        window.location.href = "/profile/index.html";
        return listing;
    } catch (error) {
        return error;
    }
}

document.getElementById("delete-button").addEventListener("click", function () {
    deleteListing();
});