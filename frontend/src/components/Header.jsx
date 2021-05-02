import React from 'react';
import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutAction } from './../redux/action/userActions';
const useStyles = makeStyles(thyme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: thyme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#02a0a0',
        transform: 'translateZ(0)'
    },
}));
const Header = (props) => {
    const { history } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signoutAction());
        setAnchorEl(null);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (pageURL) => {
        history.push(pageURL)
        setAnchorEl(null);
    };

    return (
        <div className={styles.root}>
            <AppBar className={styles.appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>ShopBridge</Typography>
                    {isMobile ? (<><IconButton onClick={handleMenu} edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => handleClose(null)}
                        >
                            <MenuItem onClick={() => handleClose('home')}>Home</MenuItem>
                            {userInfo && <MenuItem onClick={() => handleClose('productlist')}>Products</MenuItem>}
                            {userInfo && <MenuItem onClick={signoutHandler}>Logout</MenuItem>}
                            {!userInfo && <MenuItem onClick={() => handleClose('login')}>Sign In</MenuItem>}
                        </Menu>
                    </>) : (
                        <>
                            <Button onClick={() => handleClose('home')} color="inherit">Home</Button>
                            {userInfo ? (<><Button onClick={() => handleClose('productlist')} color="inherit">Products</Button>
                                <Button onClick={signoutHandler} color="inherit">Logout</Button></>)
                                : (<><Button onClick={() => handleClose('login')} color="inherit">Sign In</Button></>)}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>

    )
}
export default withRouter(Header);

/* <AppBar position='static' className={styles.root}>
    <Toolbar>
        <Grid container alignItems='center'>
            <Grid><Link to="home"><span className={styles.appTitle}>ShopBridge</span></Link></Grid>
            <Grid item sm>
            </Grid>
            <Grid item>
                <IconButton>
                    <PowerSettingsNew />
                </IconButton>
            </Grid>
        </Grid>
    </Toolbar>
</AppBar> */
