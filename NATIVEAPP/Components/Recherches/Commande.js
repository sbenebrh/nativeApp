

import React from 'react'
import Articles from './Articles'

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { withFirebase } from '../firebase'
import { connect } from 'react-redux'
import { Loading } from '../Common'



class Commande extends React.Component {
  _isMounted = false;

  state = {
    clientInfo: {},
    screen: 'commandes',
    state: true,
  }

  componentDidMount() {
    this.getCientInfo(this.props.commande)
    this.setState({ state: false })
    this._isMounted = true;
  }

  getCientInfo(commande) {
    const id = commande.clientId;
    this.props.firebase.getDataBase().ref(`Clients/${id}`)
      .once('value', snapshot => {
        this.setState({ clientInfo: snapshot.val() })
      })
  }

  returnToCommande = () => {
    this.setState({ screen: 'commandes' })
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
    }
    else {
      if (this.state.screen === 'commandes') {
       
        return (
          
            <TouchableOpacity onPress={this._isMounted ?() => this.setState({ screen: 'articles' }):null}>
              <View style={styles.container}  >
                <Text style={styles.description}  >  {this.props.commande.date}     </Text>
                <View style={styles.main_container}>
                  <View style={flexDirection = 'row', justifyContent = 'space-between'}>
                    <Text style={{ color: '#fff' }}>  nom: {this.state.clientInfo.name} </Text>
                    <Text style={{ color: '#fff' }}>  prenom: {this.state.clientInfo.lastname}     </Text>
                  </View>
                  <View style={flexDirection = 'row'}>
                    <Text style={{ color: '#fff' }}> telephone: {this.state.clientInfo.telephone} </Text>
                    <Text style={{ color: '#fff' }}  > mail: {this.props.commande.date}     </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
        )
      }
      if(this.state.screen === 'articles') {
        
        
        return (
          <>{this._isMounted && <Articles commande ={this.props.commande} return = {this.returnToCommande}/> }</>   
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: "#2f140d",
    flex: 1,
  },
  main_container: {
    flexDirection: 'row',
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000000",
    marginLeft: 10,
    flex: 1,
    overflow: 'hidden',
    width: 300,
  },
  listview: {
    padding: 10,
  },
  form: {
    justifyContent: "center",
    width: "80%"
  },

})
const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}


export default connect(mapStateToProps)(withFirebase(Commande))