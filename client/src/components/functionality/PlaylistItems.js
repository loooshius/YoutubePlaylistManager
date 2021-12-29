import React from 'react';

const PlaylistItems = ({playlistData, isPlaylistChosen}) => (
    <>
        <div>
            {playlistData.map((channel, index) => 
                <div key={index} onClick={e => console.log("clicked")}>{channel.snippet.title}</div>
            )}
        </div>
        <button onClick={() => isPlaylistChosen(false)}>
            Return to Playlists
        </button>
    </>
)

export default PlaylistItems;


