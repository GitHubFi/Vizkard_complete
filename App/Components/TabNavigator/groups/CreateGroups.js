import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
const { width, height } = Dimensions.get("window");
import { Item, Input, Content, Fab, Button, Icon, List, ListItem, Thumbnail, Left, Body, Right, } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from 'react-native-firebase';

export default class CreateGroup extends Component {
    groups = [
        {
            name: 'World', description: 'Xyafz',
        },
        {
            name: 'school', description: 'Xyadz'
        },
        {
            name: 'university', description: 'Xyadfz'
        },
        {
            name: 'hospital', description: 'wercfaffasdXyz'
        }
    ]
    all_groups = [];
    finalArray = []
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            text: '',
            dataSource: [],
            NoData: "Not found!",
            Loading: false,
            groups: []
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "All Groups",
            headerStyle: {
                backgroundColor: "#0071CE"
            },
            headerTintColor: "#fff",
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    {/* <Image
                        source={require("../../../assets/Setting.png")}
                        resizeMode="contain"
                        style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                    /> */}
                    <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                // textAlign: "center",
                flex: 1,
                marginLeft: 12
            },
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    {/* <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginRight: width / 28 }}
                    >
                        <Image
                            source={require("../../../assets/groupChat.png")}
                            resizeMode="contain"
                            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginRight: width / 28 }}
                    >
                        <Image
                            source={require("../../../../assets/Back.png")}
                            resizeMode="contain"
                            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                        />
                    </TouchableOpacity>
                </View>
            )
        };
    };
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.finalArray.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.group_name ? item.group_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();

            if (text === item.name) {
                return item
            }


            return itemData.indexOf(textData) > -1;
            return newData
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,

        });
    }

    componentDidMount() {
        const user_id = firebase.auth().currentUser.uid
        firebase.database().ref(`users/${user_id}/Groups/`).on('value', snap => {
            let group = snap.val();
            // console.log(group, 'group');

            if (group !== null) {
                let groupeKeys = Object.values(group);
                this.finalArray = [...groupeKeys];
                // this.setState({ groups: this.finalArray });
                this.setState(prevState => {
                    return {
                        groups: [...prevState.groups, this.finalArray],
                    };
                });

            } else {

            }
        })
    }


    render() {

        const array = [...this.finalArray]
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Item
                    success
                    style={{
                        backgroundColor: "#fff",
                        width: width,
                        height: height / 18,

                    }}
                >
                    <Input placeholder="  Search Group..."
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        style={{
                            paddingLeft: 10, padding: 10,
                            paddingBottom: 15
                        }}
                    />
                    {
                        (this.state.text === '') ?
                            <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
                            :
                            <MaterialCommunityIcons name="close"
                                onPress={() => { this.setState({ text: '' }) }}
                                size={width / 18}
                                style={{ color: "#0033a0", paddingRight: 10, }} />
                    }
                </Item>
                {
                    this.finalArray.length === 0 ?
                        <View style={{
                            padding: 10, alignContent: 'center', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text>No Groups!</Text>
                        </View>

                        : <FlatList
                            data={array}
                            data={(this.state.text === '' || this.state.dataSource === null) ? array : this.state.dataSource}
                            renderItem={({ item, index }) => (
                            <List>
                                    <ListItem avatar
                                        onPress={() => this.props.navigation.navigate('ChattingGroup', item)}
                                    >
                                        <Left>
                                            <View style={styles.ThumbnailStyle}>
                                                <Text style={styles.groupName}>{item.group_name.substring(0, 2).toUpperCase()}</Text>
                                            </View>
                                        </Left>
                                        <Body>
                                            <Text style={{ fontSize: width / 20, }}>{item.group_name.charAt(0).toUpperCase() + item.group_name.slice(1)}</Text>
                                        </Body>
                                    </ListItem>
                                </List>

                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.flatten({
    ThumbnailStyle: {
        backgroundColor: '#0071CE',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#0071CE',
        padding: 15,
        margin: 'auto',
        textAlign: 'center',
        // paddingTop:5
    },
    groupName: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: width / 20


    }
});