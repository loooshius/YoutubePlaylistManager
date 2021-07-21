import React from 'react';
import { makeStyles, Col, Row } from '@material-ui/core'
import Login from '../functionality/Login.js'

const FormStyle = makeStyles(() => ({
    black: {
        backgroundColor: 'black',
    },
    navWrapper: {

    },
    container: {

    },
    siteName: {

    },
    redBtn: {

    }
}));

const Landing = () => {
    const classes = FormStyle();

    const [channelData, setChannelData] = React.useState([]);

    React.useEffect(() => {
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

        try {
            fetchChannelData()
                .then(res => {
                    console.log(res[0].snippet.title);
                    setChannelData(res);
                }
            );
        }
        catch (err) {
            console.err("API Error: " + err);
        }
    }, [setChannelData]);

    return (
        <section>
            <div className={classes.container}>
                {channelData.map((channel, index) => 
                    <div>{channel.snippet.title}</div>
                )}
            </div>
            <div id="content">

            </div>
        </section>
    );
}

export default Landing;