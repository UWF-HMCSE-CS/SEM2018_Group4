// This is the MySportsFeed API

$.get({
  url: "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json",
  dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991")
  },
  data: {  team:"miami-dolphins"  },
}).done(function(info) {
    console.log(info);
    alert('Ctrl+Shift+i and go to the Console to see the data array!');
});


// Below is a working API Pull from a different API source 
/*const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();*/