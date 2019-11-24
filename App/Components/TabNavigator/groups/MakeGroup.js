import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, Alert, Modal, TouchableHighlight } from 'react-native';
const { width, height } = Dimensions.get("window");
// import { Item, Input, Content, Fab, Button, Icon, List, ListItem, Thumbnail, Left, Body, Right, } from "native-base";
import { Item, Input, Content, Fab, Button, Icon, List, ListItem, Thumbnail, Left, Body, Right, } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import AddGroupDetail from './addGroupDetail'



export default class MakeGroup extends Component {
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
    selectMember = [
        { name: 'Meraj' },
        { name: 'asher' },
        { name: 'safi' },
        { name: 'ubaid' },
        { name: 'ausaf' },
        { name: 'asim' },
        { name: 'adsf' },
    ]
    select_user = []
    All_user = []
    uid = ''
    admin = []

    seletect_user_array = []
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            text: '',
            dataSource: [],
            NoData: "Not found!",
            Loading: false,
            selectedUser: [],
            index: '',
            modalVisible: false,
        }
        this.onSelectUser = this.onSelectUser.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Create Groups",
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
    componentWillMount() {
        const uid = firebase.auth().currentUser.uid
        this.uid = uid
        let dbRef = firebase.database().ref(`users/${uid}/FriendList`);

        dbRef.on("child_added", val => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === uid) {

            } else {
                this.setState({
                    Loading: true
                })
                this.All_user = person
                this.setState(prevState => {
                    return {
                        users: [...prevState.users, person]
                    };
                });
            }

        });
        firebase.database().ref(`users/${uid}/userDetail`).on('value', val => {
            const user_info = val.val();
            const user_object = {
                name: user_info.name,
                url: user_info.url,
                email: user_info.email,
                user_uid: user_info.uid
            }
            this.admin.push(user_object);
            console.log(user_info, 'user_info')
        })
    }
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.state.users.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();

            if (text === item.name) {
                return item
            }
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            dataSource: newData,
            text: text,

        });
    }

    onSelectUser(user, index) {
        const user_object = {
            name: user.name,
            url: user.url,
            email: user.email,
            user_uid: user.uid
        }

        const array = this.select_user;
        const findIndex = array.findIndex((x => x.user_uid == user.uid));

        if (findIndex === -1) {
            array.push(user_object);
            this.setState({
                selectedUser: [...array],
            })

        } else {
            Alert.alert('', `${user_object.name} already exists`)
        }
    }

    removeElement = (ind) => {
        const removeArray = this.select_user.splice(ind, 1) // removed item
        const array = this.select_user
        this.setState({
            selectedUser: [...array]
        })
    }

    modalVisibl(visible) {
        this.setState({ modalVisible: visible });

    }
    Close = (value) => {
        this.setState({ modalVisible: value });
        this.props.navigation.navigate('AllGroup');
        this.select_user = []
        this.setState({
            selectedUser: []
        })
    }

    render() {
        const meraj = 'meraj'
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", }}>
                <Item
                    success
                    style={{
                        backgroundColor: "#fff",
                        width: width,
                        height: height / 18,
                    }}
                >
                    <Input placeholder="  Search..."
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        style={{
                            paddingLeft: 10, padding: 10,
                            paddingBottom: 15
                        }} />
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
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0, justifyContent: 'center', padding: 5, }}>
                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", padding: 10 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    this.state.selectedUser !== null ?
                                        this.state.selectedUser.map((item, ind) => {
                                            return <TouchableOpacity onPress={() => this.removeElement(ind)} key={ind}>
                                                <View
                                                    style={styles.ThumbnailStyle}
                                                >
                                                    {/* <Text style={styles.groupName} >
                                                        {item.name}</Text> */}
                                                    <Thumbnail
                                                        square
                                                        style={{ borderRadius: 30 / 4 }}
                                                        source={{ uri: item.url }} />
                                                    <Icon active size={width / 2}
                                                        style={{ color: "#000", position: 'absolute', paddingTop: 30 }}
                                                        type="MaterialIcons" name="cancel" />

                                                    <Text style={styles.groupName} >
                                                        {item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        })

                                        : null
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.users}
                            data={(this.state.text === '' || this.state.dataSource === null) ? this.state.users : this.state.dataSource}

                            renderItem={({ item, index }) => (
                                item ?
                                    <List>
                                        <ListItem avatar
                                            onPress={() => this.onSelectUser(item, index)}>
                                            <Left>
                                                <Thumbnail
                                                    square
                                                    style={{ borderRadius: 30 / 4 }}
                                                    source={{ uri: item.url }} />
                                            </Left>
                                            <Body>
                                                <Text style={{ fontSize: width / 20, }}>{item.name}</Text>
                                                <Text note>{item.email}</Text>
                                            </Body>
                                            {/* <Right>
                                                <Icon active style={{ color: "#0071CE", paddingTop: 15 }} type="AntDesign" name="checkcircle" />
                                            </Right> */}

                                        </ListItem>
                                    </List>
                                    : null
                            )}
                            keyExtractor={item => item.phone}
                        />
                    </View>
                </View>
                <View>
                    {this.select_user.length !== 0 ?
                        <Button iconRight light onPress={() => this.modalVisibl(true)}>
                            <Text style={{ paddingLeft: 10 }}>Next</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                        : null}

                </View>
                <Modal
                    animationType='slide'
                    transparent={false}
                    // style={{ backgroundColor: "black" }}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.modalVisibl(!this.state.modalVisible)
                        // console.log("cancel")
                    }}
                >
                    <View style={{
                        //  marginTop: 22,
                        padding: 10
                    }}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.modalVisibl(!this.state.modalVisible);
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="keyboard-backspace"
                                    size={width / 15}
                                    color="#000"
                                    style={{}}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <AddGroupDetail selected={this.state.selectedUser} uid={this.uid} onClose={this.Close} admin={this.admin} />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.flatten({
    ThumbnailStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 30 / 4,
        padding: 10,
        marginRight: 10,
        margin: 'auto',
        textAlign: 'center',
        paddingRight: 10
    },
    groupName: {
        color: '#000000',
        textAlign: 'center',
    }
});
function mapStateToProps(state) {
    return {
        userID: state.authReducer.userID,
        phoneNumber: state.authReducer.phoneNumber
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // createProfile: obj => dispatch(createProfileAction(obj))
    };
}


connect(
    mapStateToProps,
    mapDispatchToProps
)(MakeGroup);