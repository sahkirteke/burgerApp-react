import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger  Yap</NavigationItem>
        <NavigationItem link="/">Kontrol</NavigationItem>
    </ul>
);

export default navigationItems;