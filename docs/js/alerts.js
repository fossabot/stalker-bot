/* eslint-disable */
$('.sweetTrigger').click (function(event){
    event.preventDefault();
});

function inviteBot() {
	swal({
		title: 'You want invite me to your server?',
		text: 'I will only leave when you decide that I am no longer necessary!',
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, enter the server!',
        animation: false,
        customClass: 'animated bounceIn'
	}).then((result) => {
		if (result.value) {
			swal({
				title: 'Invited!',
				text: 'Check the new tab and prepare for the action',
                type: 'success',
                animation: false,
                customClass: 'animated bounceIn'
            });
            window.open('https://discordapp.com/api/oauth2/authorize?client_id=496184604559015936&permissions=2146958711&scope=bot', '_blank').blur();
            window.focus();
		}
	});
}

function joinDiscord(){
    swal({
		title: 'You want join to the Co-op Discord Server?',
		text: 'you can leave it at any time',
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, invite me!',
        animation: false,
        customClass: 'animated bounceIn'
	}).then((result) => {
		if (result.value) {
			swal({
				title: 'Invited!',
				text: 'Check the new tab and prepare for the amazing',
                type: 'success',
                animation: false,
                customClass: 'animated bounceIn'
            });
            window.open('https://discord.gg/Bx8D98n', '_blank').blur();
            window.focus();
		}
	});
}