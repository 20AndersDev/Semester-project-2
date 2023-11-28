const apiUrl = "https://api.noroff.dev/api/v1/auction/listings"

export async function getAuctions() {
    try {
        const response = await fetch(apiUrl);
        const auctions = await response.json();
        console.log(auctions);
    } catch (error) {
        console.log(error);
    }
}

getAuctions();