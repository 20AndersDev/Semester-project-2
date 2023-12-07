const baseApiUrl = "https://api.noroff.dev/api/v1";


// no Auth
export const apiUrlAllListings =  baseApiUrl + "/auction/listings?_seller=true&_bids=true"

// Auth

export const registerUrl = baseApiUrl + "/auction/auth/register";
export const loginUrl = baseApiUrl + "/auction/auth/login";
export let singlePostUrl = baseApiUrl + "/auction/listings/<id>";