import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const FormStyle = makeStyles(() => ({
    loginBtn: {
        color: 'white',
        alignSelf: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem', 
        borderRadius: '6px'
    },
}));

const Login = () => {
    const classes = FormStyle();

    const [loginLink, setLoginLink] = React.useState("");

    // Grabs the login link from the backend.
    React.useEffect(() => {
        let fetchLink = async () => {
            const res = await fetch("api/auth", {
                method: "GET",
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                },
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
            });

            const data = await res.json();
            return data        
        }
            
        try {
            fetchLink()
                .then(res => {
                    console.log(res);
                    if (res != "") {
                        setLoginLink(res);
                    }
                })
                .catch(console.error);
        }
        catch {
            console.log("API Error: No Response");
        }
    }, [setLoginLink]);

    // const dataToken = async ()) => {
        
    // }

    return (
        <Button variant={"contained"} color={"secondary"} focusRipple={true} className={classes.loginBtn} target="_blank" href={loginLink} onClick={(e) => e.preventDefault}>Login with Google</Button>
    );
}

export default Login;