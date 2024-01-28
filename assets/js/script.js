var authenticateEl = document.getElementById("authenticate");

var spotifyAuthentification = async function() {

localStorage.removeItem('code_verifier');

// From Spotify Web API Documentation ----------------------------------------
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);
// ---------------------------------------------------------------------------


// From Spotify Web API Documentation ----------------------------------------
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};
// ---------------------------------------------------------------------------


// From Spotify Web API Documentation ----------------------------------------
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
// ---------------------------------------------------------------------------  


// From Spotify Web API Documentation ----------------------------------------
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
// ---------------------------------------------------------------------------


// From Spotify Web API Documentation ----------------------------------------
// clientID is specific to the registered application with Spotify
const clientId = '2b183a70265148259c2caa4ab030b5ec';

// Before pushing to main branch change the URL to the final project deployed URL
const redirectUri = 'https://briandwach.github.io/spotifyauthtest/authorized.html';

const scope = 'user-read-private user-read-email playlist-modify-public user-top-read';
const authUrl = new URL("https://accounts.spotify.com/authorize");

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  state: 'concertsampler',
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
// ---------------------------------------------------------------------------

};

authenticateEl.addEventListener('click', spotifyAuthentification);
