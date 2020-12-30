import React , { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address : {
            street:'',
            postalCode:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
           
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price : this.props.price,
            customer:{
                name: 'husamettin',
                address: {
                    street :'malatya',
                    zipCode:'234223',
                    country: 'Türkiye'
                },
                email : 'test@srss.cs'
            },
            deliveryMethod: 'hizlisindan'
        }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading : false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading : false});
        });

    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name ="name"  placeholder="adınız"/>  
                <input className={classes.Input} type="email" name ="email"  placeholder="email adresi"/>
                <input className={classes.Input} type="text" name ="street"  placeholder="adresiniz"/>  
                <input className={classes.Input} type="text" name ="postal"  placeholder="posta kodu"/>

                <Button btnType="Success" clicked={this.orderHandler}> göndeer</Button>
        </form>  );
        if(this.state.loading){
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

export default ContactData;