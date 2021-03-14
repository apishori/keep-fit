import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AntDesign,Ionicons,MaterialIcons} from '@expo/vector-icons'
import { useNavigation ,useTheme} from '@react-navigation/native';
import Constant from 'expo-constants'
import {useDispatch,useSelector} from 'react-redux'

export default function Header({height}) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
  return (
    <View style={{
        // marginTop:Constant.statusBarHeight,
        position:"absolute",
       
        top:0,
        left:0,
        right:0,
        height:36,
        flexDirection:"row",
        justifyContent:"space-between",
        elevation:4,
        backgroundColor: 'gray'
    }}>
      <View style={{flexDirection:"row",margin:5}}>
         <Text 
          style={{fontSize:22, marginLeft:16, fontWeight: 'bold'}}
          onPress={()=>navigation.navigate("home")}>
          KeepFit
        </Text>
      </View>
      <View style={{
          flexDirection:"row",
          justifyContent:"space-around",
          width:64,
          margin:0
      }}>
       <Ionicons name="md-add" size={32} 
       onPress={()=>navigation.navigate("search")}
       />
      </View>
    </View>
  );
}
