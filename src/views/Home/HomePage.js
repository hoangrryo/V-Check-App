import React from 'react'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { ScrollView, Text, View, Dimensions, StyleSheet } from 'react-native'
import TripCard from './TripCard'
import { TouchableOpacity } from 'react-native'

export default function HomePage() {

  //DỮ LIỆU LẤY ĐƯỢC TỪ HỆ THỐNG
  const [data, setData] = useState([
    {id:'1', header1:'header1', header2:'header2', header3:'header3', content1:'content1', content2:'content2', content3:'content3'},
    {id:'2', header1:'header4', header2:'header5', header3:'header6', content1:'content4', content2:'content5', content3:'content6'},
    {id:'3', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'4', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'5', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'6', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'7', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'8', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'9', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'10', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'11', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'12', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'13', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
    {id:'14', header1:'header7', header2:'header8', header3:'header9', content1:'content7', content2:'content8', content3:'content9'},
  ])

  const windowWidth = Dimensions.get('window').width

  return (
    <View style={styles.container}>
      <FlatList 
        style={{width:windowWidth*0.9}}
        data={data}
        renderItem={({item}) => (
            //GỌI COMPONENT TripCard VÀ TRUYỀN TỪNG OBJECT DỮ LIỆU TRONG data ĐỂ RENDER RA MÀN HÌNH
            <TripCard item={item}/>
        )}
        numColumns={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    height:'100%', 
    justifyContent:'center', 
    alignItems:'center'
  }
})