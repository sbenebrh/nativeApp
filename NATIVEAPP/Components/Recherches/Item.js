import React from 'react'
import { View, Picker} from 'react-native'

class Item2 extends React.Component {


    state = {
        cat : '',
        quantity: '',
        object: '',
        index: 0,
        cats: '',
        items: '',
        prix: 0
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

    componentDidMount() {
        const {cat, object, quantity} = this.props.item
        this.setState({index:this.props.index})
        this.setState({cat})
        this.setState({object})
        this.setState({quantity})
    }

    render() {
        const cats =  this.state.cats
        const items = this.state.items

        const CatItem  =  cats ? Object.keys(cats).map((obj) => <Picker.Item key = {obj} color= '#fff' label = {cats[obj]} value = {cats[obj]} />) 
                : null
        const Cat = this.state.cat
      
        console.log("ITEM")
        const Articles = (items[Cat] ?
            Object.keys(items[Cat].articles).map((obj) =>  <Picker.Item key = {obj} color= '#fff' label = {items[Cat].articles[obj].name} value = {items[Cat].articles[obj].name}/>)
            : null
      )

        return (
            <View style={styles.container} >
                {console.log("ITEM")}
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.cat}
                    onValueChange={cat => this.handleChangeCat({ cat })}
                    placeHolder='choisir une categorie'>
                    {CatItem}
                </Picker>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.object}
                    onValueChange={object => this.handleChangeObject(object)}>
                    {Articles}
                </Picker>
                <NumericInput
                    initValue={this.state.quantity}
                    value={this.state.quantity}
                    onChange={value => this.handleChange({ quantity: value })}
                    step={1}
                    valueType='real'
                    minValue={0}
                    style={styles.input}
                />
            </View>
        )
    }
}

export default Item2