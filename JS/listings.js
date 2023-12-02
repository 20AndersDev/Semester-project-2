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
        image.src = auction.media[0]; // Assuming the first image URL in the 'media' array
        image.classList.add('listing-media');
        media.appendChild(image);

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = auction.title;
        postHeader.appendChild(title);

        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        const description = document.createElement('p');
        description.classList.add('post-description');
        description.textContent = `Description: ${auction.description}`;
        const endDate = document.createElement('p');
        endDate.classList.add('endDate');
        endDate.textContent = ` Bidding ends at: ${new Date(auction.endsAt).toLocaleString()}`;

        postContent.appendChild(description);
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
