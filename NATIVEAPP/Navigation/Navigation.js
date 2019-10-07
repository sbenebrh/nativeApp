
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Image , StyleSheet }  from 'react-native'

import Login from '../Components/Login'
import Splash from '../Components/SplashCreen'
import Header from '../Components/Header'
import { newUser } from '../Components/Header'

import MenuNavigation from './MenuNavigation'

import React from 'react';

import imageLogo from "../assets/image/logo_magasin.jpg"


const RootNavigator = createStackNavigator({

  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },

  NewUser : {
    screen: newUser,
    navigationOptions: {
      header: null
    }
  },

  home: {
    screen: MenuNavigation 
    ,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2f140d',
      },
      headerBackground: (
        <Image source={imageLogo}  style={styles.logo}/>
      ),
      headerTitleStyle: {
        width: '100%',
        textAlign: "center",
        fontWeight: 'bold',
        color: "#FFFFFF",
      },
      headerRight: <Header navigation={navigation} />
    })
  },



});


const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center"
  },
});



export default createAppContainer(RootNavigator);




