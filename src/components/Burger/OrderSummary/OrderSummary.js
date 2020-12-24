import React from 'react';

import Auxx from '../../../hoc/Auxx';



const orderSummary = (props) => 
{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
        return (
        <li key={igKey}>
            <span style={{textTransform : 'capitalize'}}>{igKey}</span> : 
            {props.ingredients[igKey]}

        </li>);
    } );


return (
    <Auxx>
    <h3> Siparişiniz</h3>
    <p> güzel bir burgerŞah ve malzemeleri:</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p>devam etmietk için  tıkla</p>
</Auxx>
);

        
   



};

export default orderSummary ;
