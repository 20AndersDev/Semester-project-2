
import * as urls from "/JS/api.js"; 

const apiUrlAllListings = urls.apiUrlAllListings;

async function getAuctions() {
    try {
        const response = await fetch(apiUrlAllListings);
        let auctions = await response.json();

        auctions.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

        displayAuctions(auctions);
    } catch (error) {
        return error;
    }
}


function displayAuctions(auctions) {
    const container = document.getElementById('post-container'); 
    auctions.forEach(auction => {
        const post = document.createElement('div');
        post.classList.add('post','mb-4');

        const media = document.createElement('div');
        media.classList.add('listing-media');

        if (auction.media.length > 0) {
            const image = document.createElement('img');
            image.src = auction.media[0]; 
            image.classList.add('listing-media');
            media.appendChild(image);

            if (auction.media.length > 1) {
                const noImage = document.createElement('div');
                noImage.classList.add('no-image');
                noImage.textContent = `+${auction.media.length - 1}`;
                media.appendChild(noImage);
            }
        } else {
     

            const noImageMessage = document.createElement('div');
            noImageMessage.classList.add('d-flex', 'align-items-center', 'justify-content-center','flex-column');
            const noimageicon = document.createElement('i');
            noimageicon.classList.add('fa-solid', 'fa-heart-crack', 'fa-5x');
            noImageMessage.classList.add('no-image');
            noImageMessage.textContent = 'No image found';
            noImageMessage.appendChild(noimageicon);
            media.appendChild(noImageMessage);
        }

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

        if(new Date(auction.endsAt) < new Date()) {
            endDate.textContent = 'Bidding has ended';
            endDate.style.backgroundColor = 'red';
        }

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

