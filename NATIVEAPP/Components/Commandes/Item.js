import React, { Component} from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import Button from '../Common/Button'

const Cat = {
    cat1:'sucree',
    cat2:'plateau',
    cat3:'a garnir',
    cat4:' viennoiserie'
}



export default class Item extends Component {
    state = {
        cat:'',
        object: '',
        quantity: ''
    }



    render() {

      const  CatItem = (
           
            Object.keys(Cat).map((obj)=> <Picker.Item key = {obj} styles = 'item' label = {Cat[obj]} value = {Cat[obj]} />) 
      )

        return (
            <View style = {styles.container} >
                <Picker 
                    style = { styles.picker}
                    selectedValue = {this.state.cat}
                    onValueChange = {(ItemValue,ItemIndex) => this.setState({cat:ItemValue})}
                    placeHolder= 'choisis une categorie'>


                {CatItem}
                </Picker>
                <Button  label = 'ajouter' onPress = {this.props.Additem} />
            </View>
        )
    }
}




const styles = StyleSheet.create({
        container:{
            flexDirection:'row',

        },
        picker:{
            width: '40%',
            color:'#fff',
            height:'40%'
        }


})

