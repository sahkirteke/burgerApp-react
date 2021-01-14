import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger  Yap</NavigationItem>
        <NavigationItem link="/orders">Siparişler</NavigationItem>
        {!props.isAuthenticated ?
            <NavigationItem link="/auth"> Giriş</NavigationItem>
        :   <NavigationItem link="/logout">Çıkış</NavigationItem>}
    </ul>
);

export default navigationItems;