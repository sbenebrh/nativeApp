import React, { Component} from 'react'

import { StyleSheet, View, Picker } from 'react-native'
import NumericInput from 'react-native-numeric-input'

import { connect } from 'react-redux'
import { withFirebase } from '../firebase';



class Item extends Component {
    state = {
        quantity: 0,
        cat:'sucree',
        object: 'coco passion',
        index: 0,
        cats:'',
        items: '',
        prix: 0,
        
    }

    constructor(props){
        super(props)
        this.ref = this.props.firebase.getDataBase().ref('/Cat').once('value').then((snapshot) => {
            const cats = snapshot.val()
            this.setState({cats});
        }).catch(error => {
            alert('Error1:', error.toString())
            
        })

        this.ref2 = this.props.firebase.getDataBase().ref('/items').once('value').then( snapshot => {
            const items = snapshot.val()
            this.setState({items})
        })
        .catch(error => {
            alert('Error2:', error.toString())
        })
    }

    async componentDidMount() {

        //console.log(`affichage de l index ${this.props.index}`)
        this.setState({index:this.props.index})
        console.log(this.state.items)

        
        
    }


    calculateStep = () => {
    if(this.state.cat === 'sucree'){
        return 5
    }else {
        return 1
    }
}
    handleChangeCat = cat => {
        this.setState({cat:cat.cat})
        const object = this.state.items[cat.cat].articles[Object.keys(this.state.items[cat.cat].articles)[0]].name
        this.setState({object})
        this.setState({ quantity: 0})


    }

    handleChangeObject = object => {
        this.setState({object})
        this.setState({quantity:0})
    }

    handleChange = quantity => {
        this.setState({quantity:quantity.quantity})
        const prix = quantity.quantity * this.state
                                            .items[this.state.cat]
                                            .articles[this.state.object]
                                            .prix
                                            
        this.setState({prix})
         
        const data = {
            cat:this.state.cat,
            object:this.state.object,
            prix:this.state.prix,
            index:this.state.index,
            quantity:this.state.quantity
        };

        this.props.onchange(data, this.state.index)
}


     


    render() {
        const cats =  this.state.cats
        const items = this.state.items

        const CatItem  =  cats ? Object.keys(cats).map((obj) => <Picker.Item key = {obj} color= '#fff' label = {cats[obj]} value = {cats[obj]} />) 
                : null
        const Cat = this.state.cat
      
        const Articles = (items[Cat] ?
            Object.keys(items[Cat].articles).map((obj) =>  <Picker.Item key = {obj} color= '#fff' label = {items[Cat].articles[obj].name} value = {items[Cat].articles[obj].name}/>)
            : null
      )

        return (
            <View style = {styles.container} >
                <Picker 
                    style = { styles.picker }
                    selectedValue = {this.state.cat}
                    onValueChange = {cat => this.handleChangeCat({cat})}
                    placeHolder= 'choisir une categorie'>
                {CatItem}
                </Picker>
                <Picker
                    style = {styles.picker}
                    selectedValue = {this.state.object}
                    onValueChange = {object  => this.handleChangeObject(object)}>
                    {Articles}
                </Picker>
                <NumericInput
                    initValue = {this.state.quantity}
                    value = {this.state.quantity}
                    onChange = {value => this.handleChange({quantity:value})}
                    step = {1}
                    valueType = 'real'
                    minValue = {0}
                    style = {styles.input}
                    />
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
        },
        input: {
            color: '#fff'
        }



});

const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}

export default connect(mapStateToProps)(withFirebase(Item))
