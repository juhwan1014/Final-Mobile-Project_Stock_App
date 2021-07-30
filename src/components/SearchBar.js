import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ input, onInputSubmit, onInputChange }) => {
    return (
    <View style={styles.searchContainer}>
        <View style={styles.searchText}>
            <EvilIcons style={styles.searchIcon} name="search" size={20} />
            <TextInput
            value={input}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#96A7AF"
            onChangeText={newInput => onInputChange(newInput)}
            onSubmitEditing={() => onInputSubmit()}
            />
            </View>
            <TouchableOpacity 
            style={styles.filterBtn} 
            onPress={() => onInputSubmit()}>
                <FontAwesome
                name="filter"
                color="white"
                size={20}
                />
                </TouchableOpacity>
                </View>
                );
            }
            
            const styles = StyleSheet.create({
                searchContainer:{
                    flexDirection: 'row',
                    width: '100%',
                    marginBottom: '5%',
                    marginTop: '5%'
                },
                searchText: {
                    backgroundColor: '#1A282F',
                    borderRadius: 10,
                    height: 60,
                    width: '70%',
                    flexDirection: 'row',
                },
                searchInput: {
                    color: '#96A7AF',
                    flex: 1
                },
                searchIcon: {
                    fontSize: 35,
                    alignSelf: 'center',
                    marginHorizontal: 15,
                    color: "#96A7AF"
                },
                filterBtn: {
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20%',
                    height: 60,
                    backgroundColor: '#40DF9F',
                    marginLeft: '10%'
                },
            });
            export default SearchBar
