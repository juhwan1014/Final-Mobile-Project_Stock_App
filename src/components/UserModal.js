import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import base from '../styles/styles';

const UserModal = ({
  setModalVisible,
  modalVisible,
  handleLogOut,
  user,
  navigation,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={base.headingMd}>User Info</Text>
          <Text style={styles.modalText}>Email: {user?.uid}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleLogOut(navigation)}
          >
            <Text style={styles.textStyle}>
              <MaterialIcons name='logout' size={16} color='white' />
              Logout
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#96A7AF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonClose: {
    backgroundColor: '#3DD598',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UserModal;
