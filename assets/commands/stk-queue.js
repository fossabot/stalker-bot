/* eslint no-unused-vars: "off" */

const Discord = require('discord.js');


module.exports = {
	name: 'list',
	category: 'Music',
	usage: '<tab number | empty for first tab>',
	aliases: ['q', 'queue'],
	guildOnly: true,
	description: 'Shows current songs queue for stalker bot',
	async execute(message, _args, _client, options) {
		let Songs = options.songQ.get(message.guild.id);
		let currentQueue = (Songs !== undefined && Songs !== null) ? Songs.Queue : null;
		let tabSelection = (_args[0] == undefined || _args == null) ? 1 : _args[0];
		let continueToken = false;
		if (currentQueue !== null) {
			let queueChunked = chunk(currentQueue, 5);
			if (tabSelection != 0) {
				if (tabSelection <= queueChunked.length) {
					const msg = (_args[1] == null || _args[1] == undefined) ? await message.channel.send('`Searching Music Queue ...`') : message;
					let queueEmbed = new Discord.RichEmbed()
						.setAuthor('Stalker Music', 'https://i.imgur.com/Xr28Jxy.png')
						.setColor('#7f1515');
					const elements = queueChunked[tabSelection - 1];
					const currentElement = queueChunked[0];
					for (let indexElements = 0; indexElements < elements.length; indexElements++) {
						const song = elements[indexElements];
						const currentSong = currentElement[0];
						queueEmbed.setTitle('Current Music Queue');
						if (indexElements == 0) {
							queueEmbed.addField('**Now Playing**', `** [${currentSong.songName}](${currentSong.url}) | Requested by: <@${currentSong.requestby}>  **`, false)
								.addBlankField(true)
								.addField('** :arrow_down: == Up Next == :arrow_down:**', `${elements.length - 1} Songs`, false);
						}
						else {
							queueEmbed.addField(`${indexElements}.`, `** [${song.songName}](${song.url}) | Requested by: <@${song.requestby}> **`, true)
								.setTimestamp()
								.setFooter(`Tab ${tabSelection} / ${queueChunked.length} Powered by Stalker Music`, 'https://i.imgur.com/Xr28Jxy.png');
						}
					}

					let mess = await msg.edit(queueEmbed);
					let canForward = tabSelection < queueChunked.length;
					let canBackward = tabSelection > 1;
					if (queueChunked.length > 1) {
						console.log(`Queue Chunked size: ${queueChunked.length} and tab selection: ${tabSelection} and args: ${_args[1]}`);
						if(_args[1] != undefined && _args[1] == true) {
							mess.clearReactions().then(() =>{
								if (canBackward) {
									mess.react('◀').then(() => {
										if (canForward) {
											mess.react('▶').then(() => {
												continueToken = true;
											}).catch(err => {
												console.log(`Error Reacting with ▶ | ${err}`);
											});
											continueToken = true;
										}
										else{
											continueToken = true;
										}
									}).catch(err => {
										console.log(`Error Reacting with ◀ | ${err}`);
									});
								}
								else if(canForward) {
									mess.react('▶').then(() => {
										continueToken = true;
									}).catch(err => {
										console.log(`Error Reacting with ▶ | ${err}`);
									});
									continueToken = true;
								}

							}).catch(err => {
								console.log(`Error Clearing Reactions | ${err}`);
							});
						}
						else if (canBackward) {
							mess.react('◀').then(() => {
								if (canForward) {
									mess.react('▶').then(() => {
										continueToken = true;
									}).catch(err => {
										console.log(`Error Reacting with ▶ | ${err}`);
									});
									continueToken = true;
								}
								else{
									continueToken = true;
								}
							}).catch(err => {
								console.log(`Error Reacting with ◀ | ${err}`);
							});
						}
						else if(canForward) {
							mess.react('▶').then(() => {
								continueToken = true;
							}).catch(err => {
								console.log(`Error Reacting with ▶ | ${err}`);
							});
							continueToken = true;
						}
						else{
							console.log('Can\'t create the collector');
						}


						const filter = (reaction, user) => {
							return ['◀', '▶'].includes(reaction.emoji.name) && user.id !== _client.user.id;
						};

						const collector = mess.createReactionCollector(filter, { time: 120000 });

						collector.on('collect', (reaction) => {

							const command = _client.commands.get('queue');
							if (reaction.emoji.name == '◀') {
								let newSelection = (canBackward) ? (tabSelection - 1) : null;
								console.log(`By backward new selection ${newSelection}`);
								collector.stop();
								command.execute(mess, [newSelection, true], _client, options);
							}
							else if (reaction.emoji.name == '▶') {
								let newSelection = (canForward) ? (tabSelection + 1) : null;
								console.log(`By forward new selection ${newSelection}`);
								collector.stop();
								command.execute(mess, [newSelection, true], _client, options);
							}
						});

						collector.on('end', collected => {
							mess.clearReactions().then(() => {
								continueToken = false;
								console.log('triggered end');
							}).catch(err => {
								console.log(`Error Clearing Reactions | ${err} | Reactions collected on end ${collected}`);
							});
						});
					}
				}
				else {
					message.channel.send('**This tab number doesn\'t exist :x:**');
				}
			}
			else {
				message.channel.send('**You can search for tab 0 :x:**');
			}
		}
		else {
			message.channel.send('**Nothing is playing at this time, please use play (song) to play a song :x:**');
		}

		function chunk(array, size) {
			const chunked_arr = [];
			let index = 0;
			while (index < array.length) {
				chunked_arr.push(array.slice(index, size + index));
				index += size;
			}
			return chunked_arr;
		}
	},
};