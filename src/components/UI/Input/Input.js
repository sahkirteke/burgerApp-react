import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputClasses = [classes.InputElement];
    let inputElement = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
        
    switch (props.elementType)
            {
                case ('input'):
                    inputElement = <input
                     className={inputClasses.join(' ')} 
                     {...props.elementConfig} 
                     values={props.value} 
                     onChange={props.changed}  />;
                  break;
                case ('textarea'):
                     inputElement = <textarea 
                     className={inputClasses} 
                     {...props.elementConfig} 
                     values={props.value}  
                     onChange={props.changed}/> ;
                 break ;
                case ('select'):
                     inputElement = (
                         <select 
                            className={inputClasses}
                            values={props.value}  
                            onChange={props.changed}
                         > 
                            {props.elementConfig.options.map(option => 
                            (
                                <option
                                key={option.value} 
                                values = {option.value} 
                                onChange={props.changed} > 
                                    {option.displayValue}
                                </option>
                            ))}
                         </select>  
                         ); 
                     break ;
                default:
                     inputElement = <input 
                     className={inputClasses}
                      {...props.elementConfig}
                       values={props.value} 
                       onChange={props.changed} />;   
            }

    return (
      
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}

         </div>

    );
    
};

export default input;