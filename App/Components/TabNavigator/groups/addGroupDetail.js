import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
const { width, height } = Dimensions.get("window");
import { Input, Item, Icon, Thumbnail, Button } from 'native-base';
import { connect } from "react-redux";
import firebase from "react-native-firebase";


export default class AddGroupDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: ''
        }
    }

    onChange = (event) => {
        this.setState({ group_name: event })
    }

    onCreateGroup = () => {
        const uid = this.props.uid
        const admin_Detail = this.props.admin
        const group_object = {
            group_creator_uid: uid,
            group_name: this.state.group_name,
            group_member: [...this.props.selected, ...admin_Detail],
            admin_detail: [...this.props.admin]

        }
        // console.log(group_object)

        group_object.group_member.forEach(element => {
            if (element) {
                firebase.database().ref(`users/${element.user_uid}/Groups`).push(group_object).
                    // then(() => {
                    // firebase.database().ref(`users/${uid}/Groups/`).push(group_object)
                    then(() => {
                        this.props.onClose(false);
                    }).catch((err) => {
                        Alert.alert(err)
                    })
            }
        });
    }


    render() {
        // console.log(this.state.group_name, 'onChangeText')
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', padding: 10, flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>New Group</Text>
                        </View>
                        <Item>
                            <Icon type="FontAwesome" name="group" />
                            <Input regular placeholder='Enter Group Name...' onChangeText={(event) => this.onChange(event)} />
                        </Item>
                        <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Participants :{this.props.selected.length}</Text>
                        <View style={{
                            flex: 0.8,
                            flexDirection: 'row',
                            paddingLeft: 25
                        }}>
                            <FlatList
                                numColumns={4}
                                data={this.props.selected}
                                renderItem={({ item, index }) => (
                                    // item ?
                                    <TouchableOpacity >
                                        <View
                                            style={styles.ThumbnailStyle}>
                                            <Thumbnail
                                                circular
                                                source={{ uri: item.url }} />
                                            <Icon active size={width / 2}
                                                style={{ color: "#00b386", position: 'absolute', paddingTop: 30 }}
                                                name='checkmark-circle' active />
                                            <Text style={styles.groupName} >{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(o, index) => index.toString()} />
                        </View>
                        {this.state.group_name === '' ?
                            <View />
                            : <View style={{
                                flex: 0.2,
                                backgroundColor: "#fff",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: 'center',
                                paddingTop: 5
                            }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.onCreateGroup}
                                >
                                    <Text style={styles.textStyle}>Create Group</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </View>
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
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2d95e3',
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 20,
        width: '70%',
        borderWidth: 0.5

    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
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
)(AddGroupDetail);