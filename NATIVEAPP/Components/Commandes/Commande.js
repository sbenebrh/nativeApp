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
        date: new Date().toISOString().slice(0, 10)
    };


    componentDidMount = () => {
        console.log('<Commande/> mon level => ' + this.props.level)
    }



    handleValidPress = () => {
        this.setState({ isLoading: true });

        const { name, date, telephone } = this.state
        try {
            this.props.firebase.getDataBase()
                .ref(`commandes/${Date.now()}`)
                .set({
                    name, date, telephone
                })
                .then(() => {
                    console.log(name + ' ' + date + telephone + ' commandes insert ')
                    this.setState({ isLoading: false });
                    alert('Commade Ajouter ' + name + ' ' +  date + ' ' + telephone)
                })
                .catch(error => {
                    Alert.alert('Error:', error.toString())
                    this.setState({ isLoading: false });
                })
        } catch (error) {
            Alert.alert('Error:', error.toString())
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
                        <FormTextInput
                            value={this.state.password}
                            placeholder={'le nom du client'}
                            placeholderTextColor="#FFF"
                            onChangeText={(name) => { this.setState({ name }) }}
                        />
                        <FormTextInput
                            value={this.state.password}
                            placeholder={'telephone'}
                            placeholderTextColor="#FFF"
                            onChangeText={(telephone) => { this.setState({ telephone }) }}
                        />

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
        flex: 1,
        backgroundColor: "#2f140d",
        alignItems: "center",
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