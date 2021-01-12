import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : name
    };

}

export const removeIngredient = (name) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    };

}

export const setIngedients =(ingredients)=> {
    return { 
        type : actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};
export const fetchIngredientsFailed = () => {
    return actionTypes.FETCH_INGREDIENTS_FAILS;
}


export const initIngredients = () => {
    return dispatch=> {
        axios.get('https://react-my-burger-48d76-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngedients(res.data)); 
        } )
         .catch(error=> {
            dispatch(fetchIngredientsFailed());
       }) ;
    };
};
