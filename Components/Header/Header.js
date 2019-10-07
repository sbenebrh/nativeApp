import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PopupMenu from './PopupMenu'

import { withFirebase } from '../firebase';


class Header extends Component {

  state = {
    isProgress: false,
    visible: false
  }

  componentWillUnmount() {
  }

  handlLogOut = () => {
    try {
      this.props.firebase.doSignOut()
      //firebase.auth().signOut()
      this.props.navigation.replace('Login');
    } catch (err) {
      console.log('error login ' + err)
    }
  }

  handlNewUser = () => {
    try {
      this.props.navigation.replace('NewUser');
    } catch (err) {
      console.log('error login ' + err)
    }
  }

  onPopupEvent = (eventName, index) => {
    // logout 
    if (index === 0) {
      this.handlLogOut()
    }
    // all voicemails
    else if (index === 1) {
      this.handlNewUser()
    }
  }


  render() {
    return (
      this.state.isProgress
        ?
        <CustomProgressBar visible={this.state.visible} />
        :
        <View>
          {
            this.props.level === 'manager' ?
              <PopupMenu actions={['Deconnexion', 'Nouvelle utilisateur']} onPress={this.onPopupEvent} visible={this.state.visible} />
              :
              <PopupMenu actions={['Deconnexion']} onPress={this.onPopupEvent} visible={this.state.visible} />
          }
        </View>
    )
  }




}


const CustomProgressBar = ({ visible }) => (
  <View style={styles.main_container}>
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.Text}>annatel
          <Text style={{ color: '#c71585' }}>.mobile</Text>
        </Text>
        <View style={{ borderRadius: 10, backgroundColor: '#FFFFFF', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200', fontWeight: 'bold', color: "#c71585" }}>Loading ... </Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  </View>
);



const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  Text: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: 'bold',
    color: "#000000",
    marginTop: 80,
    marginBottom: 100
  }
});


const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}
export default connect(mapStateToProps)(withFirebase(Header))