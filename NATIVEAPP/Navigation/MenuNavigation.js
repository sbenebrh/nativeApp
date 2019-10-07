// Navigation/Navigation.js
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Recherche from '../Components/Recherches'
import Commande from '../Components/Commandes'
import Fabrication from '../Components/Fabrications'


const MoviesTabNavigator = createBottomTabNavigator({
    Commande: {
        screen: Commande
        ,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icon/Commande.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.title} >Commande</Text>
                    </View>
                )
            }
        }
    },
    Recherche: {
        screen: Recherche
        ,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icon/search.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.title} >Recherche</Text>
                    </View>
                )

            }
        }
    },
    Fabrication: {
        screen: Fabrication
        ,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/icon/Fabrication.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.title} >Fabrication</Text>
                    </View>
                )
            }
        }
    },
},
    {
        tabBarOptions: {
            activeBackgroundColor: '#8fbc8f', // Couleur d'arrière-plan de l'onglet sélectionné 2f140d  a9a9a9
            inactiveBackgroundColor: '#a9a9a9', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        },
        initialRouteName: "Recherche"
    }
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "#ffffff",
    },
    icon: {
        width: 25,
        height: 25
    }
})


export default createAppContainer(MoviesTabNavigator)