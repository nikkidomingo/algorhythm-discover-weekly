// Load data on page load
var user = {};

function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
		while ( e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
	return hashParams;
}

var params = getHashParams();

var access_token = params.access_token,
	state = params.state;

if (!access_token) {
	alert('There was an error during the authentication');
	window.location = "https://nikkidomingo.github.io/algorhythm-discover-weekly/";
} else {
	$.ajax({
		url: 'https://api.spotify.com/v1/me',
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
		success: function(response) {
			localStorage['user'] = JSON.stringify(response);
			user = JSON.parse(localStorage['user']);
			console.log(user.display_name);
		}
	});
}

$("form").submit(function(e) {
	e.preventDefault();
	let input = $('#field-input').val();

	$.ajax({
		url: 'https://api.spotify.com/v1/search?q='+ input +'&type=track',
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
		success: function(response){
			if(response.tracks.items.length == 0){
				showErrorMessage("<b>Oh no!</b> There are no results from the song you entered.");
			} else {
				hideErrorMessage();
				localStorage['curr_track'] = response.tracks.items[0].uri;
				editPlaylist(response.tracks.items[0].uri, 'post');
			}
		}
	});
});


$("#btn-undo").click(function(e) {
	var curr_track = localStorage['curr_track'];

	if(curr_track){
		hideErrorMessage();
		editPlaylist(curr_track, 'delete');
		localStorage.removeItem('curr_track');
	} else {
		showErrorMessage("There's nothing to undo. <b>#NoRagrets</b> ")
	}
});

function editPlaylist(uri, action){
	return $.ajax({
		url: 'https://api.spotify.com/v1/users/nikkiii.domingo/playlists/1vDTKlecWuxEiTLu1Pf1fu/tracks',
		type: action,
		dataType: 'json',
		data: JSON.stringify({
			uris : [uri]
		}),
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
		success: function(response){
			hideErrorMessage();
			$('.playlist-container').empty();
			$('.playlist-container').append('<iframe src="https://open.spotify.com/embed?uri=spotify:user:nikkiii.domingo:playlist:1vDTKlecWuxEiTLu1Pf1fu" class=playlist frameborder="0" allowtransparency="true"></iframe>');
		}
	});
}

function showErrorMessage(message){
	$('.error-message').empty();
	$('.error-message').append(message);
	$('.error-message').removeClass('hidden');
}

function hideErrorMessage(){
	$('.error-message').addClass('hidden');
}