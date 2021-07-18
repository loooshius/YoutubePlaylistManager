require('dotenv').config();
const { google } = require('googleapis');

// route to grab the playlist id -> need this to start modifying values in the playlistItems column
// const playlist = (function () {
//     return {
//         playlistsByChannel: async function () {
//             await google.youtube('v3').playlists.list({
//                 key: process.env.YOUTUBE_TOKEN,
//                 part: 'snippet',
//                 channelId: '',
//                 maxResults: 10,
//             }).then((response) => {
//                 const { data } = response;
//                 let items = "";
//                 data.items.forEach((item) => {
//                     items += `Playlist Name: ${item.snippet.title}\nDescription: ${item.snippet.description}\nPlaylistID: ${item.id}\n\n`;
//                 })
//                 console.log(items);
//                 //return items;
//             }).catch((err) => console.log(err));
//         },

//         // grabs the items of a particular playlist
//         playlistItems: async function() {
//             await google.youtube('v3').playlistItems.list({
//                 key: process.env.YOUTUBE_TOKEN,
//                 part: 'snippet',
//                 playlistId: '',
//                 maxResults: 40,
//             }).then((response) => {
//                 const { data } = response;
//                 let trackNumber = 1;
//                 let items = ""
//                 data.items.forEach((item) => {
//                     items += `Item ${trackNumber} - Item Title: ${item.snippet.title}\n`;
//                     trackNumber++;
//                 })
//                 console.log(items);
//                 //return items;
//             }).catch((err) => {
//                 console.log(err);
//                 return "";
//             });
//         }
//     }
// }) ();

// // Gives a written list of every playlist
// const ListPlaylist = async () => {
//     // let playlist = await playlist()
//     // console.log(playlist);
//     // let playlistItems = await playlistItems()
//     // console.log(playlistItems);
//     await playlistsByChannel()
//     await playlistItems()
// }

//module.exports = playlist;
