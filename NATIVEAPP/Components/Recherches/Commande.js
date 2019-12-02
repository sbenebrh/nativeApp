

import React from 'react'

import { StyleSheet, View, Text,  TouchableOpacity} from 'react-native'
import { withFirebase } from '../firebase'
import { connect } from 'react-redux'



class Commande extends React.Component{


    state = {clientInfo: {} }
  
    componentDidMount() {
      this.getCientInfo(this.props.commande)
    }
  
    async getCientInfo (commande ) {
      const id = commande.clientId;
        await this.props.firebase.getDataBase().ref(`Clients/${id}`)
            .once('value' ,snapshot => {
              this.setState({clientInfo:snapshot.val()})
            })
    }
  
    render() {
        return (
          <TouchableOpacity onPress={() => console.log(this.props.commande)}>
            <View style={styles.container}  >
              <Text style={styles.description}  >  {this.props.commande.date}     </Text>
              <View style={styles.main_container}>
                <View style={flexDirection = 'row' , justifyContent = 'space-between'}>
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
  
  })
  const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}


export default connect(mapStateToProps)(withFirebase(Commande))