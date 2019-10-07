import React, { Component } from 'react';
//import react in our project
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import { connect } from 'react-redux'

import { withFirebase } from '../firebase';

import NumericInput from 'react-native-numeric-input'

import {
  Button, Loading
} from '../Common'

class Fabrication extends Component {

  constructor() {
    super();
  }
  state = {
    listDataSource: {},
    isLoading: true,
    screen: 'SUCRE'
  }




  componentDidMount = () => {
    console.log('<Commande/> mon level => ' + this.props.level)

    this.ref = this.props.firebase.firebaseSyncState(`/menu`, {
      context: this,
      state: 'listDataSource',
    })

    
    this.setState({ isLoading: false })
  }

  componentWillUnmount() {
    this.props.firebase.removeBindingSyncState(this.ref)
  }

  

  countChangesubCategory = (category, subCategory, value) => {
    let { listDataSource, screen } = this.state
    listDataSource[screen][category]['subcategory'][subCategory].count = value
    this.setState({
      listDataSource
    })
  }

  handleSelectedCategory = (category) => {
    // const { listDataSource, screen } = this.state
    // listDataSource[screen][category].isExpanded = !listDataSource[screen][category].isExpanded
    // this.setState({ listDataSource })
  }


  render() {
    const { isLoading, listDataSource, screen } = this.state
    //console.log(this.state.listDataSource.SALE)
    if (isLoading === true || listDataSource[screen] === undefined) {
      return (
        <View style={styles.container}>
          <View style={styles.form}>
            <Loading />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Button label={'Sucre'} onPress={() => this.setState({ screen: 'SUCRE' })} />
            <Button label={'Sale'} onPress={() => this.setState({ screen: 'SALE' })} />
          </View>
          <View style={styles.scrollView}>
            <ScrollView>
              {
                Object.keys(listDataSource[screen])
                  .map(category =>
                    <View key={category}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.handleSelectedCategory(category)}
                        style={styles.header}>
                        <Text style={styles.headerText}>{">" + category} </Text>
                      </TouchableOpacity>
                      {
                        // listDataSource[screen][category].isExpanded === true
                        //   &&
                        Object.keys(listDataSource[screen][category].subcategory)
                          .map(subCategory =>
                            <TouchableOpacity
                              key={subCategory}
                              style={styles.content}
                            >
                              <Text style={styles.text}>
                                {subCategory}
                              </Text>
                              <NumericInput
                                onChange={(value) => this.countChangesubCategory(category, subCategory, value)}
                                textColor='#000000' 
                                type='up-down' rounded 
                                style={styles.InputNumeric}
                                value={Number(listDataSource[screen][category].subcategory[subCategory].count)}
                              />
                            </TouchableOpacity>
                          )
                      }
                    </View>
                  )
              }
            </ScrollView>
          </View>
        </View>
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
  title: {
    justifyContent: "center",
    width: "80%",
    height: "20%"
  },
  textTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    justifyContent: "center",
    width: "90%",
    height: "75%"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: 'stretch'
  },
  form: {
    justifyContent: "center",
    width: "80%"
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#dcdcdc",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  InputNumeric: {
    alignSelf: 'flex-end',
    color: '#000000',
    backgroundColor: '#ffffff',
    width: "20%",
    height: "20%"
  },
  text: {
    color: '#000000',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
});



const mapStateToProps = (state) => {
  return {
    level: state.level
  }
}
export default connect(mapStateToProps)(withFirebase(Fabrication))