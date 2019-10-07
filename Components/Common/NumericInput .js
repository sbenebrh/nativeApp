import React from 'react';
import NumericInput from 'react-native-numeric-input'


const numericInput = ({ style , onChange  , count , category , Subcategory }) => (
    <NumericInput 
    onChange={( value ) => onChange(category,Subcategory,value) }
    textColor='#FFFFFF'
    style={style}
    value={Number(count)}
     />
)


export default numericInput 