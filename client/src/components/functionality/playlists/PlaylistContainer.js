import React from 'react';

const PlaylistContainer = ({playlistData, isPlaylistChosen}) => {
    const [channelData, setChannelData] = React.useState([]);
    const [playlistData, setPlaylistData] = React.useState([]);
    const [isPlaylistChosen, setIsPlaylistChosen] = React.useState(false);

    React.useEffect(() => {
        try {
            if (isPlaylistChosen) fetchChannelData()
            else fetchPlaylistData(playlistId)
                .then(res => {
                    setChannelData(res);
                }
            );
        }
        catch (err) {
            console.err("API Error: " + err);
        }
    }, [setChannelData, setPlaylistData]);

    const fetchChannelData = async () => {
        const res = await fetch("api/playlist", {
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

    const fetchPlaylistData = async (playlistId) => {
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

    const assignPlaylist = (isChosen) => {
        console.log("Completed: " + isChosen);
        setIsPlaylistChosen(isChosen);
    }

    return (
        <div>
            {
            isPlaylistChosen 
                ? <PlaylistItems playlistData={playlistData} fetchChannelData={fetchPlaylistData} isPlaylistChosen={assignPlaylist}/>
                : <Playlists channelData={channelData} isPlaylistChosen={assignPlaylist} /> 
            }
        </div>
    );
}
    

export default PlaylistContainer;