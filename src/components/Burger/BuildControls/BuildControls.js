 import React from 'react';
 import classes from './BuildControls.css';
 import BuildControl from './BuildControl/BuildControl';


 const controls = [

    {label :'Salata', type : 'salad'},
    {label :'Biber', type : 'bacon'},
    {label :'Et', type : 'meat'},
    {label :'Peynir', type : 'cheese'}
 ];

 const buildControls =  (props) => (

    <div className={classes.BuildControls}>
        <p> ücret :<strong> {props.price.toFixed(2)}</strong></p>

     {controls.map(ctrl => (
         <BuildControl 
         
          key ={ctrl.label} 
          label= {ctrl.label} 
          added = {() => props.ingredientAdded(ctrl.type)}
          removed = {() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          />
     ))} 

        <button
            className = {classes.OrderButton}
            disabled ={!props.purchasable}
            onClick={props.ordered}>
                Sipariş ver
        </button>
    
    </div>
 );

 export default buildControls;