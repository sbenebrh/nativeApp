import React from 'react'
import { StyleSheet, View, Text, Dimensions, Picker } from 'react-native'
import { connect } from 'react-redux'
import { Button, FormTextInput, Loading } from "../Common";
import DatePicker from 'react-native-datepicker'
import Item from './Item'

import { withFirebase } from '../firebase';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

class Commande extends React.Component {

    state = {
        isLoading: false,
        clientId: "",
        name: "",
        telephone: "",
        lastname: "",
        mail: "",
        mag: "",
        date: new Date().toISOString().slice(0, 10),
        
        commande: [0],
        counter: 0,
        screenHeight: 0,
        sucree:[],
        salee:[],

    };

    
    componentDidMount() {
            console.log('<Commande/> mon level => ' + this.props.level)
    }

    separateCommandeIntoSaltedAndSugar(){
        const commande = this.state.commande

        Object.keys(commande).forEach( article => {
            if(commande[article].cat === 'sucree' || commande[article].cat === 'viennoiseries')
            {
                const sucree = this.state.sucree
                sucree.push(commande[article])
                this.setState({sucree})
            }
            else {
                const salee = this.state.salee
                salee.push(commande[article])
                this.setState({salee})
            }
        })
    }

    deleteEmptyItem() {
        
        this.setState({ isLoading: true })
        let commande = this.state.commande
        if(commande[commande.length - 1] === 0)
        {
            commande.pop()
        }
        
        this.setState({commande})
    }

    async createNewClientAndGetID() {
        const { name, telephone, lastname, mail } = this.state

        await this.props.firebase.getDataBase()
            .ref(`Clients`)
            .orderByChild("telephone")
            .equalTo(this.state.telephone)
            .once('value', (snapshot) => {
                //old client
                if (snapshot.val() !== null) {
                    this.setState({
                        isLoading: false,
                        clientId: telephone
                    });
                }
                else {
                    if (telephone !== "") {
                        this.props.firebase.getDataBase()
                            .ref(`Clients/${telephone}`)
                            .set({
                                name, lastname, telephone, mail
                            })
                            .then(() => {
                                this.setState({
                                    isLoading: false,
                                    clientId: telephone
                                });
                                console.log("telephone" + telephone)
                            })
                            .catch(error => {
                                alert('Error1:', error.toString())
                                this.setState({ isLoading: false });
                            })
                    }
                    else {
                        this.setState({
                            isLoading: false
                        });
                    }
                }
            })
            .catch(error => {
                alert('Error: ', error.toString())
                this.setState({ isLoading: false })
            })
            console.log("id" + this.state.clientId)
    }

    async createNewCommande() {

        let {clientId, date, mag, sucree, salee} = this.state
        //console.log(clientId)
        clientId = this.state.telephone
        const dDate = new Date().toISOString().slice(0, 10)

        await this.props.firebase.getDataBase()
            .ref(`commandes/${Date.now()}`)
            .set({
                clientId, dDate , date, mag, sucree, salee
            })
            .then(() => {
                alert('commande ajouter')
                this.setState({ isLoading: false });
            })
            .catch(error => {
                alert('error: ', error.toString())
            })
    }

    resetData() {
        this.setState({
            commande:[0],
            isLoading: false,
            name: "",
            telephone: "",
            lastname: "",
            mail: "",
            mag: "",
            date: new Date().toISOString().slice(0, 10),
            clientId: "",
            counter: 0,
            sucree:[],
            salee:[],
            });
    }

    handleValidPress = () => {

        this.deleteEmptyItem()
        if(this.state.commande === [])
        {
            return null
        }

        this.separateCommandeIntoSaltedAndSugar()

        this.createNewClientAndGetID()
        this.createNewCommande()

        this.resetData()
    }


    changeItem = (data, index = 0) => {
        const commande = this.state.commande
        commande[index] = data

        this.setState({ commande })
    }

    handlePress = () => {
        let counter = this.state.counter
        counter += 1
        this.setState({ counter })

        let commande = this.state.commande
        commande.push("0")
        this.setState({ commande })
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
    }

    render() {
        
        //console.log(this.state.items.length + " items")
        //console.log(this.state.items)

        const afficheItems = (
            Object.keys(this.state.commande).map((key) => <Item 
                                                            key={key} 
                                                            onchange={(data, index) => { this.changeItem(data, index) }} 
                                                            index={this.state.counter} />)
        )

        const scrollEnabled = this.state.screenHeight > height;

       // console.log(this.state.counter)
        if (this.state.isLoading === true) {
            return (
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Loading />
                    </View>
                </View>
            )
        } else {
            return (

                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>Passer Commande</Text>
                    </View>
                    <ScrollView
                        style={{ flex: 1 }}
                        scrollEnabled ={ true }
                        onContentSizeChange={this.onContentSizeChange}>
                        <FormTextInput
                            value={this.state.name}
                            placeholder={'nom'}
                            placeholderTextColor="#FFF"
                            onChangeText={(name) => { this.setState({ name }) }}
                        />
                        <FormTextInput
                            value={this.state.lastname}
                            placeholder={'prenom'}
                            placeholderTextColor="#FFF"
                            onChangeText={(lastname) => { this.setState({ lastname }) }}
                        />
                        <FormTextInput
                            value={this.state.telephone}
                            placeholder={'telephone'}
                            placeholderTextColor="#FFF"
                            autoCompleteType = 'tel'
                            keyboardType = 'number-pad'
                            required
                            onChangeText={(telephone) => { this.setState({ telephone }) }}
                        />
                        <FormTextInput
                            value={this.state.mail}
                            placeholder={'mail'}
                            placeholderTextColor="#FFF"

                            onChangeText={(mail) => { this.setState({ mail }) }}
                        />

                        <View style={styles.form}>
                        <Picker
                            selectedValue = {this.state.mag}
                            style = {styles.picker}
                            onValueChange = {(itemValue, itemIndex) =>
                                this.setState({ mag: itemValue })
                            }>
                            <Picker.Item label = 'Veuiller selectionner un magasin ...' value = '' color= '#fff'/>
                            <Picker.Item label = "crimee" value = "crimee" color= '#fff' />
                            <Picker.Item label = "petit" value = "petit" color= '#fff' />
                            <Picker.Item label = "akol" value = "akol" color= '#fff' />
                        </Picker>
                            <View style={styles.date}>
                                <Text style={{ color: '#ffffff', fontSize: 14, }} >Date : </Text>
                                <DatePicker
                                    style={{ width: 200, backgroundColor: '#fff' }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Selectionner la date"
                                    format="YYYY-MM-DD"
                                    minDate="2019-10-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"

                                    onDateChange={(date) => { this.setState({ date }) }}
                                />
                            </View>
                        </View>
                        <View style={ styles.commande } >
                            {afficheItems}
                            <View style={styles.button}>
                                <Button label={'ajouter article'} onPress={() => this.handlePress()} />
                            </View>
                            <View style={styles.button}>
                                <Button label={'Nouvelle commande'} onPress={this.handleValidPress} />
                            </View>
                        </View>
                    </ScrollView>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f140d",
        alignItems: "stretch",
        justifyContent: "space-around"
    },
    logo: {
        width: "80%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    form: {
        flexDirection :'row',
        justifyContent: 'space-between',
        width: "80%"
    },
    button: {
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
    },
    title: {
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems:'center'
    },
    picker:{
        width: '40%',
        color:'#fff',
    },
    commande: {
        justifyContent:'center',
        width: '90%',
    },
});



const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}
export default connect(mapStateToProps)(withFirebase(Commande))