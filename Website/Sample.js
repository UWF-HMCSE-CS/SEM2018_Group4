// This is the MySportsFeed API

var players;

$.get({
  url: "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json",
  dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991")
  },
  data: {  team:"miami-dolphins"  },
}).done(function(rcv) {
    players = rcv.cumulativeplayerstats.playerstatsentry;
	// Un-comment below to see data info in browser's console view  
	console.log(players);

	var out = "<tr><th>NO</th><th>NAME</th><th>POS</th></tr>";
    $.each(players, function(index, data) {
        out += '</td><td>' + data.player.JerseyNumber  
		     + '</td><td>' + data.player.FirstName + ' ' + data.player.LastName
			 + '</td><td>' + data.player.Position 
			 + '</td></tr>';
    });
	document.getElementById("APICall").innerHTML = out;
});