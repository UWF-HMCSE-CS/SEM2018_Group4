// This is the MySportsFeed API

var players;
var sport = document.getElementById("API").innerHTML;
var weblink;
switch(sport) 
{
  case "NFL":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json";
    break;
  case "NBA":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nba/2017-2018-regular/cumulative_player_stats.json";
    break;
  case "MLB":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/mlb/2018-regular/cumulative_player_stats.json";
    break;
  case "FIFAA":
	//NO FIFAA Link
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json";
    break;
  case "NHL":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nhl/2017-2018-regular/cumulative_player_stats.json";
    break;
  default:
	// putting it to NFL, for now
	weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json"
}

$.get({
  url: weblink,
  dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991")
  },
  data: {  team:""  },
}).done(function(rcv) {
    players = rcv.cumulativeplayerstats.playerstatsentry;
	// Un-comment below to see data info in browser's console view  
	//console.log(players);
	console.log(sport);

	var out = "<tr><th>NO</th><th>NAME</th><th>POS</th></tr>";
    $.each(players, function(index, data) {
        out += '</td><td>' + data.player.JerseyNumber  
		     + '</td><td>' + data.player.FirstName + ' ' + data.player.LastName
			 + '</td><td>' + data.player.Position 
			 + '</td></tr>';
    });
	document.getElementById("APICall").innerHTML = out;
});

function APICall(){
var players;
var sel = document.getElementById("TeamChoice");
var opt = sel.options[sel.selectedIndex].value;
var name = sel.options[sel.selectedIndex].text;
var sport = document.getElementById("API").innerHTML;
var weblink;
switch(sport) 
{
  case "NFL":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json";
    break;
  case "NBA":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nba/2017-2018-regular/cumulative_player_stats.json";
    break;
  case "MLB":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/mlb/2018-regular/cumulative_player_stats.json";
    break;
  case "FIFAA":
	//NO FIFAA Link
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json";
    break;
  case "NHL":
    weblink = "https://api.mysportsfeeds.com/v1.0/pull/nhl/2017-2018-regular/cumulative_player_stats.json";
    break;
  default:
	// putting it to NFL, for now
	weblink = "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json"
}

$.get({
  url: weblink,
  dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991")
  },
  data: {  team:opt  },
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
	document.getElementById("ChangeName").innerHTML = name + " Players' Stats";
});
}