import React, { Component } from 'react'
import { View, UIManager, findNodeHandle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'



const ICON_SIZE = 28

export default class PopupMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError() {
    console.log('Popup Error')
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }

  
  render() {
    return (
      <View>
          <Icon
            name='more-vert'
            size={ICON_SIZE}
            color={'white'}
            onPress={this.onPress}
            ref={this.onRef} />
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({ icon })
    }
  }


}