import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FormTextInput} from "../Common";

class ClientInfo extends React.Component {

    state = {
        lastname:"",
        firstname:"",
        telephone:"",
        mail:"",

    };

    render(){
     return(   <View style = {styles.container}>
            <View style = {styles.name}>
                <FormTextInput
                    value= {this.state.password}
                    placeholder = {'nom'}
                    placeholderTextColor="#FFF"
                    onChangeText={(lastname) => { this.setState({ lastname }) }}
                    />
                    <FormTextInput
                        placeholder = {'prenom'}
                        placeholderTextColor="#FFF"
                        onChangeText={(firstname) => { this.setState({ firstname }) }}
                    />
            </View>
            <View style = {styles.info}>
                <FormTextInput
                    placeholder = {'telephone'}
                    placeholderTextColor="#FFF"

                    onChangeText={(telephone) => { this.setState({ telephone }) }}
                    />
                    <FormTextInput
                        placeholder = {'mail'}
                        placeholderTextColor="#FFF"
                        
                        onChangeText={(mail) => { this.setState({ mail }) }}
                    />
            </View>

        </View>)
        
    } 

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#2f140d",
        alignItems:"stretch",
        
    },

    name:{
        flexDirection: 'row',
        justifyContent:"space-around"
    },

    info:{
        flexDirection: 'row',
        justifyContent:"space-around"
        
    },


});

export default ClientInfo;