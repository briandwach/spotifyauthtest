const clientId = '2b183a70265148259c2caa4ab030b5ec';
const redirectUri = 'https://briandwach.github.io/spotifyauthtest/authorized.html';
const url = "https://accounts.spotify.com/api/token";

// From Spotify Web API Documentation ----------------------------------------
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
// ---------------------------------------------------------------------------


// From Spotify Web API Documentation ----------------------------------------
const getToken = async token => {

    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code, 
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
// ---------------------------------------------------------------------------

    window.location.replace('https://briandwach.github.io/spotifyauthtest/toptracks.html');
};


getToken();
