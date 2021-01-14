import React , { Component } from "react";
import {connect} from  'react-redux'; 

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../../store/actions/index';


class ContactData extends Component {
    state = {
       orderForm:{
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
        },
        formIsValid : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price : this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order, this.props.token);

        // axios.post('/orders.json', order)
        // .then(res => {
        //     this.setState({loading : false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading : false});
        // });

    }
    checkValidity (value,rules) {
        let isValid = true;
        if (!rules){
            return true;
        }
        if ( rules.required) {
            isValid= value.trim()!== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
         if (rules.maxLength) {
                    isValid = value.length <= rules.maxLength && isValid;
         }
        return isValid;
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

          const updatedFormElement ={
              
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier]= updatedFormElement;

        let formIsValid = false;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    values = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    touched = {formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed ={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ) )}
                <Button btnType="Success" displayed = {!this.state.formIsValid} > göndeer</Button>
        </form>  );
        if(this.props.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h3>iletişim adreslerini gir</h3> 
                    {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading :state.order.loading,
        token : state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
    };
    
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));