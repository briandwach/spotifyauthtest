// From Spotify Web API Documentation ----------------------------------------
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);



// From Spotify Web API Documentation ----------------------------------------
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};



// From Spotify Web API Documentation ----------------------------------------
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  


// From Spotify Web API Documentation ----------------------------------------
const hashed = sha256(codeVerifier);
const codeChallenge = base64encode(hashed);



// From Spotify Web API Documentation ----------------------------------------
const clientId = '2b183a70265148259c2caa4ab030b5ec';
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://briandwach.github.io/spotifyauthtest/");



// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();



// From Spotify Web API Documentation ----------------------------------------
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');



// From Spotify Web API Documentation ----------------------------------------
const getToken = async code => {

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
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
  
    const body = fetch(url, payload);
    const response = body.json();
  
    localStorage.setItem('access_token', response.access_token);
  };
  

  