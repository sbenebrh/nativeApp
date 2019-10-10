import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button, FormTextInput , Loading} from "../Common";
import DatePicker from 'react-native-datepicker'

import { withFirebase } from '../firebase';


class Commande extends React.Component {

    state = {
        isLoading : false ,
        name: "",
        telephone: "",
        lastname:"",
        mail:"",
        date: new Date().toISOString().slice(0, 10)
    };


    componentDidMount = () => {
        console.log('<Commande/> mon level => ' + this.props.level)
    }



    handleValidPress = () => {
        this.setState({ isLoading: true });

        const { name,  telephone, lastname, mail,  } = this.state
        try {
            this.props.getDataBase()
            .ref("Clients")
            .orderByChild("telephone")
            .equalTo(telephone)
            .once('value',(snapshot) =>{
                console.log(snapshot.val())
                if(snapshot.val() !== null) {
                    var obj = snapshot.val()
                    var result = Object.keys(obj).map(function(key){
                        console.log(obj[key])
                       // return obj[key]
                    });
                }
                else {
                    console.log("newClient")
                    
                    }
                }
            );
            console.log("second part")
            this.props.firebase.getDataBase()
                .ref(`Clients/${this.state.telephone}`)
                .set({
                    name, lastname, telephone, mail
                })
                .then(() => {
                    console.log(name + ' ' +  telephone + ' client insert ')
                    this.setState({ isLoading: false });
                    alert('Client Ajouter ' + name + ' '  + telephone)
                })
                .catch(error => {
                    alert('Error1:', error.toString())
                    this.setState({ isLoading: false });
                })
        } catch (error) {
            alert('Error2:', error.toString())
            this.setState({ isLoading: false });
        }
 
    }




    render() {
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
                    <FormTextInput
                        value={this.state.name}
                        placeholder = {'nom'}
                        placeholderTextColor="#FFF"
                        onChangeText={(name) => { this.setState({ name }) }}
                    />
                    <FormTextInput
                        value={this.state.lastname}
                        placeholder = {'prenom'}
                        placeholderTextColor="#FFF"
                        onChangeText={(lastname) => { this.setState({ lastname }) }}
                    />
                    <FormTextInput
                    value={this.state.telephone}
                    placeholder = {'telephone'}
                    placeholderTextColor="#FFF"
                    onChangeText={(telephone) => { this.setState({ telephone }) }}
                    />
                    <FormTextInput
                        value={this.state.mail}
                        placeholder = {'mail'}
                        placeholderTextColor="#FFF"
                        
                        onChangeText={(mail) => { this.setState({ mail }) }}
                    />
                   
                    <View style={styles.form}>
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

                      
                        <View style={styles.button}>
                            <Button label={'Nouvelle commande'} onPress={this.handleValidPress} />
                        </View>
                    </View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        justifyContent: "center",
        width: "80%"
    },
    button: {
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
    },
    title: {
        justifyContent: "center",
        alignItems:"center"
    },
    textTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        flexDirection: 'row',
        justifyContent: "space-around"
    }
});



const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}
export default connect(mapStateToProps)(withFirebase(Commande))