import React from 'react'


import { withFirebase } from '../firebase'
import { connect } from 'react-redux'
import { View , StyleSheet,ScrollView} from 'react-native'
import Item2 from './Item'
import { Button } from '../Common'


class Articles extends React.Component {
    state = {
        articles: [],
        sucree: [],
        salee: [],
        Loading:true
    }


    componentDidMount() {
        
        let articles = this.state.articles
        
        this.props.commande.sucree && articles.push(...this.props.commande.sucree)
        this.props.commande.salee && articles.push(...this.props.commande.salee)
        this.setState({articles})
        this.setState({Loading:false})
        
    }

    handlePressAddArticle = () => {
        let articles = this.state.articles
        articles.push(0)
        this.setState({articles})
    }

    deleteEmptyElement = () => {

    }
    separateIntoSucreeandSalee = () => {

    }
    updateDataBase = articles => {
        if( articles !== null)
        {
            deleteEmptyElement()
            separateIntoSucreeandSalee()
            const {sucree, salee} = this.state
            this.props.firebase.getDataBase()
                    .ref(`/commandes/${this.props.commande.name}/sucree`)
                    .update({sucree})
            this.props.firebase.getDataBase()
                    .ref(`/commandes/${this.props.commande.name}/salee`)
                    .update({salee})
        }
        else {
            this.props.firebase.getDataBase()
                    .ref(`/commandes/${this.props.commande.name}`)
                    .update(null)
        }
        
    }

    resetState = () => {

    }

    handlePressValidCommande = () => {
        updateDataBase(this.state.articles)
        
    }

    handleDeleteCommande = () => {
        updateDataBase(null)
        resetState()
    }

    changeItem = (data, index = 0) => {
        const articles = this.state.articles
        articles[index] = data

        this.setState({ articles })
    }

    render() {
        let {articles} = this.state
       
        const afficherItems =  articles
                                .map( obj => {
                                    <Item2
                                    item = {articles[obj]} 
                                    index = {articles.indexOf(obj)}
                                    onChange = {(data, index) => { this.changeItem(data, index) }}
                                    key = {articles.indexOf(obj)} />}
                                ) 
                               
        return (
            <View>
                <ScrollView
                    style={{ flex: 1 }}
                    scrollEnabled={true}>
                    {afficherItems}
                    <Button onPress={this.handlePressAddArticle} label="Ajouter article" />
                    <View style={styles.validation}>
                        <Button onPress={this.handlePressValidCommande} label="Valider" />
                        <Button onPress={this.handleSendMail} label="Envoyer par mail" />
                        <Button onPress={this.handleDeleteCommande} label="Supprimer" />
                    </View>
                </ScrollView>
            </View>
            
        )}
}

const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}

const styles = StyleSheet.create({
    validation:{
        flexDirection:'row',
        width: '50%'
    },
})

export default connect(mapStateToProps)(withFirebase(Articles))