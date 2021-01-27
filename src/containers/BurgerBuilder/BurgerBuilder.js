import React, { useState, useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const burgerBuilder = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInıtIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurcahase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInıtIngredients();
  }, [onInıtIngredients]);
  // componentDidMount () {
  //     this.props.onInıtIngredients();
  //     //  axios.get('https://react-my-burger-48d76-default-rtdb.firebaseio.com/ingredients.json')
  //     //  .then(res => {
  //     //      this.setState({ingredients: res.data});

  //     //  } )
  //     //   .catch(error=> {
  //     //       this.setState({error:true});

  //     // }) ;

  // }

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  // addIngredientHandler = ( type ) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
  //     this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = ( type ) => {
  //     const oldCount = this.state.ingredients[type];
  //     if ( oldCount <= 0 ) {
  //         return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
  //     this.updatePurchaseState(updatedIngredients);
  // }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurcahase();
    props.history.push("/checkout");
    //alert('You continue!');
    // this.setState({loading: true});
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price : this.state.totalPrice,
    //     customer:{
    //         name: 'husamettin',
    //         address: {
    //             street :'malatya',
    //             zipCode:'234223',
    //             country: 'Türkiye'
    //         },
    //         email : 'test@srss. cs'
    //     },
    //     deliveryMethod: 'hizlisindan'
    // }
    // axios.post('/orders.json', order)
    // .then(res => {
    //     this.setState({loading : false , purchasing :false});
    // })
    // .catch(error => {
    //     this.setState({loading : false , purchasing :false});
    // });
    //////////////////////////////////////////
    // const queryParams =[];
    //     for (let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&')
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  // {salad: true, meat: false, ...}
  let orderSummary = null;

  let burger = error ? <p> malzemeler yüklenemedi</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />

        <BuildControls
          ingredientAdded={onIngredientAdded}
          isAuth={isAuthenticated}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          price={price}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }
  // if (this.state.loading){
  //     orderSummary = <Spinner/>
  // }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(burgerBuilder, axios);
