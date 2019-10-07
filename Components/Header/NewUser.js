import * as React from "react";
import { Image, StyleSheet, View, Alert, Picker, Text } from "react-native";
import { Button, FormTextInput, Loading } from "../Common";
import imageLogo from "../../assets/image/logo_magasin.jpg";
import { connect } from 'react-redux'

import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBuTBItB327F5qzynf3Wd0gY7W4RqGs3Ac",
  authDomain: "appreact-native.firebaseapp.com",
  databaseURL: "https://appreact-native.firebaseio.com",
  projectId: "appreact-native",
  storageBucket: "",
  messagingSenderId: "1026877898929",
  appId: "1:1026877898929:web:efadd7448ba9eb9ca4a290",
  measurementId: "G-V35DMWYM17"
}

class NewUser extends React.Component {


  state = {
    email: "",
    password: "",
    level: "- Select Level -",
    isLoading: false
  }



  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handleLevelChange = (level) => {
    this.setState({ level });
  };


  handlePasswordChange = (password) => {
    this.setState({ password });
  };



  handleRegisterPress = () => {
    this.setState({ isLoading: true });

    const { email, password, level } = this.state
    try {
      var secondaryApp = firebase.initializeApp(config, "Secondary");

      secondaryApp.auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(() => {
          let uid = secondaryApp.auth().currentUser.uid
          firebase.database()
            .ref(`users/${uid}`)
            .set({
              email,
              level
            })
            .then(() => {
              console.log(email + ' ' + uid + ' user insert ')
              alert(email + ' '  + 'created successfuly')
            })
            .catch(error => {
              alert('Error insert user' +  error)
              this.setState({ isLoading: false });
            })
          this.setState({ isLoading: false });
        })
        .catch(error => {
          alert('Error ' + error ) 
          this.setState({ isLoading: false });
        });
    } catch (error) {
      alert('Error ' + error )
    }
  }


  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={styles.container}>
          <Image source={imageLogo} style={styles.logo} />
          <View style={styles.form}>
            <Loading />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Image source={imageLogo} style={styles.logo} />
          <View style={styles.form}>
            <FormTextInput
              value={this.state.email}
              placeholder={'Entrez Email'}
              placeholderTextColor="#FFF"
              onChangeText={this.handleEmailChange}
            />
            <FormTextInput
              value={this.state.password}
              placeholder={' mot de passe'}
              placeholderTextColor="#FFF"
              onChangeText={this.handlePasswordChange}

            />
            <Picker
              selectedValue={this.state.level}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ level: itemValue })
              }>
              <Picker.Item label='Veuiller selectionner un (Level) ...' value='' />
              <Picker.Item label="manager" value="manager" />
              <Picker.Item label="client" value="client" />
            </Picker>
          </View>
          <View style={styles.button}>
            <Button label={'Ajouter Utulisateure'} onPress={this.handleRegisterPress} />
            <Button label={'Retour home'} onPress={() => this.props.navigation.replace('home')} />
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
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "70%"
  },
  picker: {
    color: '#ffffff',
    backgroundColor: "#8fbc8f",
    fontSize: 14,
  }
})




const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}
export default connect(mapStateToProps)(NewUser)