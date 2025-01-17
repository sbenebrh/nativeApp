

import React from 'react'

import { StyleSheet, View, FlatList } from 'react-native'
import { withFirebase } from '../firebase'
import { connect } from 'react-redux'

import { Button } from '../Common'
import Commande from './Commande'

const Commandes = ({ commandes , handleReturn }) => {
    return (
        <View style={styles.container}>
            <Button label={'Retour'} onPress={handleReturn} />
            <FlatList
                style={styles.listview}
                ItemSeparatorComponent={FlatListItemSeparator}
                data={commandes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <Commande commande={item} retour={handleReturn}/>
                }
            />
        </View>
    )
}




FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
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

export default connect(mapStateToProps)(withFirebase(Commandes))

