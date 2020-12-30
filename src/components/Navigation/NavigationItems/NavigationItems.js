import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger  Yap</NavigationItem>
        <NavigationItem link="/orders">Siparişler</NavigationItem>
    </ul>
);

export default navigationItems;