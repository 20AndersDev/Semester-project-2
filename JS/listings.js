
import * as urls from "/JS/api.js"; 

const apiUrlAllListings = urls.apiUrlAllListings;

async function getAuctions() {
    try {
        const response = await fetch(apiUrlAllListings);
        let auctions = await response.json();

        // Sort auctions by creation date in descending order
        auctions.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

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

        const sellerInfo = document.createElement('div');
        sellerInfo.classList.add('seller-info','d-flex','align-items-center');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = auction.title;
        postHeader.appendChild(title);

        const seller = document.createElement('h2');
        seller.classList.add('seller');
        seller.textContent = `${auction.seller.name}`;
        sellerInfo.appendChild(seller);

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.src = auction.seller.avatar;
        sellerInfo.appendChild(userAvatar); 

        postHeader.appendChild(sellerInfo);

        const postContent = document.createElement('div');
        postContent.classList.add('post-content','p-4');

        const highestBid = document.createElement('p');
        highestBid.classList.add('highestBid');

       
        let highestAmount = 0;
        auction.bids.forEach(bid => {
            if (bid.amount > highestAmount) {
                highestAmount = bid.amount;
            }

        });
        highestBid.textContent = `Highest bid: ${highestAmount} credits`;

        const endDate = document.createElement('p');
        endDate.classList.add('endDate');
        endDate.textContent = ` Bidding ends at: ${new Date(auction.endsAt).toLocaleString()}`;

        postContent.appendChild(highestBid);
        postContent.appendChild(endDate);



        post.appendChild(media);
        post.appendChild(postHeader);
        post.appendChild(postContent);

        container.appendChild(post);


        
        post.addEventListener('click', () => {
            window.location.href = '/single-Listing/index.html' + '?id=' + auction.id;
        });
    });

}

getAuctions();

