import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
} from "react-native"
import imageLogo from "../../assets/image/logo_magasin.jpg";
import { connect } from 'react-redux'
import { Loading } from "../Common";




import { withFirebase } from '../firebase';


class Splash extends Component {

  state = {
  }

  componentWillMount() {

    // firebase.initializeApp(config);

    this.props.firebase.AuthStateChanged((user) => {
      if (user) {
        this.props.firebase.getDataBase().ref('users/' + user.uid).once('value', snapshot => {
          var result = snapshot.val()
          console.log('connected user login  ' + result.email + ' level  ' + result.level)
          this.props.dispatch({ type: "level", value: result.level })
          this._navigate('home')
        })
      } else {
        console.log('not-connected')
        this._navigate('Login')
      }
    })
  }



  _navigate(screen) {
    setTimeout(() => { this.props.navigation.replace(screen) }, 10);
  }




  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <Loading />
      </View>
    );
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
});


const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}
export default connect(
  mapStateToProps)(
    withFirebase(Splash)
  )