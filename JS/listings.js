import * as urls from "/JS/api.js"; 
const apiUrlAllListings = urls.apiUrlAllListings;

async function getAuctions() {
    try {
        const response = await fetch(apiUrlAllListings);
        const auctions = await response.json();
        displayAuctions(auctions);
        console.log(auctions);
    } catch (error) {
        console.log(error);
    }
}

function displayAuctions(auctions) {
    const container = document.querySelector('.post-container'); 
    auctions.forEach(auction => {
        const post = document.createElement('div');
        post.classList.add('post','mb-4');

        const media = document.createElement('div');
        media.classList.add('listing-media');
        const image = document.createElement('img');
        image.src = auction.media[0]; 
        image.classList.add('listing-media');
        media.appendChild(image);

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header','p-4');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = auction.title;
        postHeader.appendChild(title);

        const seller = document.createElement('h2');
        seller.classList.add('seller');
        seller.textContent = ` ${auction.seller.name}`;
        postHeader.appendChild(seller);

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.src = auction.seller.avatar;
        postHeader.appendChild(userAvatar); 

        const postContent = document.createElement('div');
        postContent.classList.add('post-content','p-4');

        const highestBid = document.createElement('p');
        highestBid.classList.add('highestBid');

       
        const lastBidIndex = auction.bids.length - 1; 
        highestBid.textContent = `Highest bid:  ${lastBidIndex} $`;
        


/*
        const description = document.createElement('p');
        description.classList.add('post-description');
        description.textContent = ` ${auction.description}`;
        postContent.appendChild(description);
*/

        const endDate = document.createElement('p');
        endDate.classList.add('endDate');
        endDate.textContent = ` Bidding ends at: ${new Date(auction.endsAt).toLocaleString()}`;

        postContent.appendChild(highestBid);
        postContent.appendChild(endDate);


        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        const bidButton = document.createElement('span');
        bidButton.textContent = 'Place a Bid';

        postFooter.appendChild(bidButton);

        post.appendChild(media);
        post.appendChild(postHeader);
        post.appendChild(postContent);
        post.appendChild(postFooter);

        container.appendChild(post);
    });
}

getAuctions();


const profileName = document.getElementById('profile-name');