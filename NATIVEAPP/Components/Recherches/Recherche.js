import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import { Button, FormTextInput, Loading } from "../Common"
import { withFirebase } from '../firebase';

import Commandes from './Commandes'

class Recherche extends React.Component {

  state = {
    isLoading: false,
    name: "",
    date: new Date().toISOString().slice(0, 10),
    commandes: {},
    screen: 'recherche',
  };

  componentDidMount = () => {
    console.log('<Recherche/> mon level => ' + this.props.level)
  }


  handleValidPress = () => {
    this.setState({ isLoading: true });
    const { date } = this.state
    try {

      this.props.firebase.getDataBase().ref("commandes").orderByChild("date").equalTo(date).once("value", (snapshot) => {
        console.log(snapshot.val())
        if (snapshot.val() !== null) {
          var obj = snapshot.val()
          var result = Object.keys(obj).map(function (key) {
            return obj[key]
          });
          this.setState({
            isLoading: false,
            commandes: result,
            screen: 'list'
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }

      });


      // this.props.firebase.getDataBase().ref('commandes').once('value', snapshot => {
      //   //console.log(snapshot.val())
      //   var obj = snapshot.val()
      //   var result = Object.keys(obj).map(function (key) {
      //     return obj[key]
      //   });
      //   //console.log(result);

      //   this.setState({
      //     isLoading: false,
      //     commandes: result,
      //     screen: 'list'
      //   }); 
      //  });

    } catch (error) {
      console.log(error);
      alert('Error', error)
      this.setState({ isLoading: false });
    }
  };




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
        <>
          {
            this.state.screen === 'recherche' ?
              <View style={styles.container}>
                <View style={styles.title}>
                  <Text style={styles.textTitle}>Recherche Commande</Text>
                </View>
                <View style={styles.form}>
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
                  <FormTextInput
                    value={this.state.name}
                    placeholder={'nom'}
                    placeholderTextColor="#FFF"
                    onChangeText={(name) => { this.setState({ name }) }}
                  />
                  <View style={styles.button}>
                    <Button label={'Rechercher'} onPress={this.handleValidPress} />
                  </View>
                </View>
              </View>
              :
              <Commandes commandes={this.state.commandes} handleReturn={() => this.setState({ screen: 'recherche' })} />
          }
        </>
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
  content: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
});



const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}
export default connect(mapStateToProps)(withFirebase(Recherche))