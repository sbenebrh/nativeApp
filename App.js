
// App.js

import React from 'react'
import RootNavigator from './Navigation/Navigation'
import { Provider } from 'react-redux'
import { store } from './Store/configureStore'

import { YellowBox } from 'react-native';
import _ from 'lodash';
import Firebase, { FirebaseContext } from './Components/firebase';



YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

YellowBox.ignoreWarnings(['Require cycle:']);


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
          <RootNavigator />
        </FirebaseContext.Provider>
      </Provider>
    )
  }
}




