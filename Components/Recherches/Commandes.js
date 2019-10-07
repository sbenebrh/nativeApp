

import React from 'react'

import { StyleSheet, View, Text, FlatList , TouchableOpacity } from 'react-native'


import { Button } from '../Common'

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
                    <Commande commande={item}  />
                }
            />
        </View>
    )
}


const Commande = ({ commande  }) => (
    <TouchableOpacity onPress={() => console.log(commande)}>
        <View style={styles.container}  >
        <Text style={styles.description}  >  {commande.date}     </Text>
            <View style={styles.main_container}>
                <View style={flexDirection = 'row'}>
                    <Text >
                        <Text style={{ color: '#c71585' }}>  {commande.name} </Text>
                    </Text>
                    <Text style={styles.description}  >  {commande.telephone}     </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

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


export default (Commandes)
