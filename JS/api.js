const baseApiUrl = "https://api.noroff.dev/api/v1";


// no Auth
export const apiUrlAllListings =  baseApiUrl + "/auction/listings?_seller=true&_bids=true"

// Auth

export let registerUrl = baseApiUrl + "/auction/auth/register";
export let loginUrl = baseApiUrl + "/auction/auth/login";