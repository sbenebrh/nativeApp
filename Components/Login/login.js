import * as React from "react";
import { Image, StyleSheet, View, Alert } from "react-native";
import imageLogo from "../../assets/image/logo_magasin.jpg";
import { connect } from 'react-redux'
import { Button , FormTextInput , Loading } from "../Common";

import { withFirebase } from '../firebase';

class LoginScreen extends React.Component {


  state = {
    email: "",
    password: "",
    isLoading : false
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };



  handleLoginPress = () => {
    console.log("Login button pressed");
    this.setState({ isLoading : true });

    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        this.setState({ isLoading : false })
        this.props.navigation.replace('home')
      })
      .catch(error => {
        Alert.alert('Error:', error.toString())
        this.setState({ isLoading : false });
      })

  }

  

  


  render() {
    if (this.state.isLoading === true ) {
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
              placeholder={'entrez votre Email'}
              placeholderTextColor="#FFF"
              onChangeText={this.handleEmailChange}
            />
            <FormTextInput
              value={this.state.password}
              placeholder={'mot de passe'}
              placeholderTextColor="#FFF"
              onChangeText={this.handlePasswordChange}

            />
          </View>
          <View style={styles.button}>
            <Button label={'login'} onPress={this.handleLoginPress} />
            <Button label={'home'} onPress={() => this.props.navigation.replace('home')} />
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
    width: "80%"
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "70%"
  }
});


 const mapStateToProps = (state) => {
    return {
      level : state.level
    }
  }
  export default connect(mapStateToProps)(withFirebase(LoginScreen))