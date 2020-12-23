import { Component } from "react";

import React from 'react';
import Auxx from    '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';


class BurgerBuilder extends Component    {
     render (){
         return (

            <Auxx>
               <Burger  />
                <div>burger kontrolü</div>
            </Auxx>

         );
        }

}

export default BurgerBuilder;