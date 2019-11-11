import React, { Component} from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import Button from '../Common/Button'
import NumericInput from 'react-native-numeric-input'

const Cat = {
    cat1:'sucree',
    cat2:'plateau',
    cat3:'a garnir',
    cat4:' viennoiserie'
}

const Items = {
    'sucree': {
        name: 'sucree',
        articles:[        
        'Mille-feuilles',
        'Delice praline',
        'Royal']

    },
    'plateau': {

        name:'plateau',
        articles:[
        'pizza',
        'fricases',
        'chausson au thon'
    ]},
    'viennoiserie': {
        name:'viennoiserie',
        articles:[
        'croissant',
        'mini',
        'raisins',
        'chocolat'
    ]},
    'a garnir': {
        name:'a garnir',
        articles:[
        'navette',
        'pain de mie',
        'pain surprise vide'
    ]}
}


export default class Item extends Component {
    state = {
        cat:'sucree',
        object: '',
        quantity: 0
    }

calculateStep = () => {
    if(this.state.cat === 'sucree'){
        return 5
    }else {
        return 1
    }
}

    render() {

      const  CatItem = (
           
            Object.keys(Items).map((obj) => <Picker.Item key = {obj} styles = 'item' label = {Items[obj].name} value = {Items[obj].name} />) 
      )
        
      const Cat = this.state.cat

      const Articles = (
         // console.log(Items[Cat].articles[0])
          Object.keys(Items[Cat].articles).map((obj) =>  <Picker.Item key = {obj} label = {Items[Cat].articles[obj]} value = {Items[Cat].articles[obj]}/>)
      )

        return (
            <View style = {styles.container} >
                <Picker 
                    style = { styles.picker }
                    selectedValue = {this.state.cat}
                    onValueChange = {(ItemValue,ItemIndex) => this.setState({cat:ItemValue})}
                    placeHolder= 'choisis une categorie'>


                {CatItem}
                </Picker>
                <Picker
                    style = {styles.picker}
                    selectedValue = {this.state.object}
                    onValueChange = {(ItemValue, ItemIndex) => this.setState({object:ItemValue})}>
                    {Articles}
                </Picker>
                <NumericInput
                    value = {this.state.value}
                    onChange = {quantity => this.setState({quantity})}
                    step = {1}
                    valueType = 'real'
                    minValue = {0}
                    initValue = {0}/>
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

