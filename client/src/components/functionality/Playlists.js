import React from 'react';

const Playlists = ({channelData, fetchedPlaylistData, isPlaylistChosen}) => {
    
    const fetchPlaylistData = async (playlistId) => {
        playlistId = playlistId ?? "";

        const res = await fetch(`/api/playlist/${playlistId}`, {
            method: "GET",
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
        });

        const data = await res.json();
        return data;   
    }

    const getPlaylistItems = (playlistId) => {
        console.log("playlist clicked: " + playlistId);
        try {
            fetchPlaylistData(playlistId)
                .then(res => {
                    console.log(res[0]);
                    fetchedPlaylistData(res);
                    isPlaylistChosen(true);
                }
            );
        }
        catch (err) {
            console.err("API Error: " + err);
        }
    }

    return(
        <>
            <div>
                {channelData.map((channel, index) => 
                    <button key={index} onClick={() => getPlaylistItems(channel.id)}>{channel.snippet.title}</button>
                )}
            </div>
        </>
    );
}

export default Playlists;


