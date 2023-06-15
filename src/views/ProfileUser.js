import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button } from "@react-native-material/core"

export default function ProfileUser({navigation}) {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button
          title='LOG OUT'
          style={{backgroundColor:'#0794B5', borderRadius:15, }}
          onPress={()=>navigation.navigate('Login_Page')}
        />
    </View>
  )
}
