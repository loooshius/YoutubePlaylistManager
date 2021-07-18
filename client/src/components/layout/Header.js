import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import Login from '../functionality/Login.js'

const FormStyle = makeStyles(() => ({
    black: {
        backgroundColor: 'black',
    },
    navWrapper: {

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5

    },
    siteName: {
        margin: 5,
        fontSize: '2rem',
        color: 'white',
        fontDecoration: 'none',
        cursor: 'pointer'
    },
    login: {
        display: 'flex',
        padding: 5,
    }
}));

const Header = () => {
    const classes = FormStyle();

    return (
        <>
            <nav className={classes.black}>
                <div className={classes.navWrapper}>
                    <div className={classes.container}>
                        <Link underline={"none"} to="#!" className={classes.siteName}>YouTube Channel Data</ Link>
                        <div className={classes.login}>
                            <Login />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;