import React , { useState } from "react";
import {connect} from  'react-redux'; 

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../../store/actions/index';
import {updateObject , checkValidity} from '../../../shared/utility';

const contactData = props =>{
   const [orderForm, setOrderForm] = useState({
            name: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Adınız'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false,
                touched : false
            },
            street : {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Adres'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false,
                touched : false
            },
            zipCode:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'KOD'
                },
                value:'',
                validation: {
                    required: true,
                    minLength :5,
                    maxLength :5
                },
                valid:false,
                touched : false
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Ülke'
                },
                value:'',
                validation: {
                    required: true,
                   
                },
                valid:false,
                touched : false
            },   
            email : {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Email adresi'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false,
                touched : false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig: {
                    options :[
                        {value:'hizli', displayValue: 'Hizli'},
                        {value:'ucuz', displayValue: 'Ucuz'}
                ]
                },
                value:'hizli',
                validation:  {},
                valid : true
            }
        })
        const [formIsValid, setFormIsValid] = useState(false);
        
    

    const  orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        // this.setState({loading: true});
        const order = {
            ingredients: props.ing,
            price : props.price,
            orderData:formData,
            userId :props.userId
        }
        props.onOrderBurger(order , props.token);
        // axios.post('/orders.json', order)
        // .then(res => {
        //     this.setState({loading : false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading : false});
        // });

    }
   

    const  inputChangedHandler = (event,inputIdentifier) => {
     

          const updatedFormElement = updateObject(orderForm[inputIdentifier],{
              value:event.target.value,
              valid:checkValidity(event.target.value, orderForm[inputIdentifier].validation),
              touched:true
          });
          const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]:updatedFormElement
          });
       
        

        let formIsValid = false;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id:key,
                config:orderForm[key]
            });
        }
        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    values = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    touched = {formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed ={(event)=>inputChangedHandler(event,formElement.id)}
                    />
                ) )}
                <Button btnType="Success" displayed = {!formIsValid} > göndeer</Button>
        </form>  );
        if(props.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h3>iletişim adreslerini gir</h3> 
                    {form}
            </div>
        );
    

}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading :state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
    };
    
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));