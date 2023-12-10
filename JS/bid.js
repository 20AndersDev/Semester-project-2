

 const placeBid = async () => {
    try {
        const response = await fetch(newBidUrl, {
            method: 'POST',
            body: JSON.stringify({
                amount: 1000,
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
