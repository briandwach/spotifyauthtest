var refreshEl = document.getElementById("refresh");
var artistsEl = document.getElementById('artists');

const clientId = '2b183a70265148259c2caa4ab030b5ec';
const url = "https://accounts.spotify.com/api/token";

async function getTopArtists() {
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=3&offset=0', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    console.log(data);

    var ulEl = document.createElement('ul');
    ulEl.textContent = 'Top 3 artists';
    artistsEl.appendChild(ulEl);

    
    for (var i = 0; i < 3; i++) {
        var liEl = document.createElement('li');
        liEl.textContent =  data.items[i].name;
        ulEl.appendChild(liEl);
    };
    
};


const getRefreshToken = async () => {

    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
};

refreshEl.addEventListener('click', getRefreshToken);

getTopArtists();



/* async function getProfile() {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log(data);
  };

  getProfile();  */