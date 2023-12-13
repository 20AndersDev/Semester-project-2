const baseApiUrl = "https://api.noroff.dev/api/v1";


// no Auth
export const apiUrlAllListings =  baseApiUrl + "/auction/listings?_seller=true&_bids=true&created=true&sort=created&sortOrder=desc";

// Auth

export const registerUrl = baseApiUrl + "/auction/auth/register";
export const loginUrl = baseApiUrl + "/auction/auth/login";
export const singlePostUrl = baseApiUrl + "/auction/listings/<id>?_seller=true&_bids=true";
export const placeBid = baseApiUrl + "/auction/listings/<id>/bids";
export const createListing = baseApiUrl + "/auction/listings";
export const singleUserUrl = baseApiUrl + "/auction/profiles/<name>";