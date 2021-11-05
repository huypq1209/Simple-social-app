import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform,Modal, Image, Text, View, Pressable,FlatList,ActivityIndicator,TextInput,Alert } from 'react-native'
import firebase from '../Utilities/firebaseDb'
import { Picker } from '@react-native-picker/picker'

import DateTimePickerModal from "react-native-modal-datetime-picker"


const Home = props => {
    const {navigation,setIsAuth} = props
    const [user, setUser] = useState(null)
    const [data,setData]=useState([])
    const [date, seDate] = useState("")
    const [tieuDe,setTieuDe]=useState(null)
    const [noiDung,setNoiDung]=useState(null)
    const [visible, setVisible] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const showDatePicker = () => {setDatePickerVisibility(true)}

    const hideDatePicker = () => {setDatePickerVisibility(false)}
    const handleConfirm = (date) => {
        // console.log('>>>>>>>>>Ban da chon: ' + date)
        seDate(date)
        setDatePickerVisibility(false);
    }
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
        const {currentUser} = firebase.auth()
        setUser(currentUser)
    }, []) 
    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            setIsAuth(false)
            navigation.navigate('Loading')
        })
        .catch(err => console.log('>>>', err))
    }
    useEffect(()=>{
        const fetch=firebase.firestore()  
            .collection('news')
            .onSnapshot(processData)
        return fetch   
    },[]) 
    // const LoadData = async () => {
    //     setIsLoading(true)
    //     try {
    //         await firebase.firestore()
    //         .collection('news')
    //         .onSnapshot(processData)
            
    //     }catch(error)
    //     {
    //         // console.log(error) 
    //     }
    // } 
    const processData=res=>{
        let items=[]
        res.forEach(each=>{
            const{title,body,img,createAt}=each.data()
            items.push({title, body, img,createAt, key:each.id})
        })
        setData(items) 
        setIsLoading(false)
        
    }
    const addPost = async () => {
        try {
            await firebase.firestore()
                .collection('news').add({body:noiDung, title:tieuDe, img:"https://firebasestorage.googleapis.com/v0/b/reactnative-74cfd.appspot.com/o/aa.jpg?alt=media&token=3348d8d4-1b69-4c3b-9686-a3b34a3d5ea9", createAt:date+"" })
                setVisible(!visible)
        } catch (error) {
        }
    }
    console.log(data)
    
    
    const renderItem = ({ item }) => (
          
          
        <View style={{
             
            backgroundColor:'white',
            padding:5,
            paddingLeft:15,
            borderBottomWidth:1,
           
            flexWrap:'wrap'
        }}>
            <Pressable 
           
            onPress={() => {navigation.navigate('Details', {key: item.key,setIsAuth})}}>
                <View style={{flexDirection:'row'}}>
                <Image 
                    style={{width:50,
                            height:50,
                            borderRadius:50
                    
                    }} 
                    source={require('../images/aa.jpg')} />
                    <Text style={{textAlign:'center',
                                margin:15,
                                fontSize:15,
                                fontWeight:'bold'
                    }}>Tene</Text>
                    </View>
                <Text style={{color:'black',fontStyle:'italic',opacity:0.5}}>{item.createAt}</Text>    
                
                <Text style={styles.text}>{item.title}</Text>
                <Image 
                style={{width:330,
                        height:330}}
                    source={{uri:item.img}}
                />
                
            </Pressable>
        </View>
        
            )
    
    return(
        <>
        <View style={{flexDirection:'row',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomRightRadius:15,
                    borderBottomLeftRadius:15
                    }}>
            <Pressable onPress={handleSignOut}>
                <Text
                style={styles.label}>
                Log out
                </Text>
                
            </Pressable>
            <Pressable>
                <Text style={styles.label} onPress={() => setVisible(true)}>New Post</Text>
            </Pressable>
            {/* <Image source={require('../images/aa.jpg')} /> */}
        </View>
        <View style={{flex:1}}>
            
            {/* <Text style={{
                marginHorizontal:'30%',
                marginVertical:5,
                padding:10,
                fontSize:15,
                fontWeight:'bold',
                color:'white',
                borderRadius:20,
                textAlign:'center',
                backgroundColor:'#CC6633'

            }} 
            
            onPress={LoadData}>Load FireBase</Text> */}
            {/* <ActivityIndicator
                        size='large'
                        color='white'
                        animating={isLoading}
                        hidesWhenStopped={true}
                    /> */}
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            />
          
            
        
        </View>
        <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
                onRequestClose={
                    () => {
                        Alert.alert('Bạn đã đóng modal')
                        setVisible(!visible)
                    }
                }
            >
                <View 
                style={{
                                    backgroundColor: 'white',
                                   
                                    padding: 20,
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                                }}
                >
                    <Text style={{textAlign:'center',
                                    fontSize:25,
                                    marginBottom:10
                        }}>Add Post</Text>
                  <TextInput
                        
                        style={styles.imputText}
                        placeholder='Tiêu đề'
                        value={tieuDe}
                        onChangeText={setTieuDe}
                    />
                    <TextInput
                       
                        style={styles.imputText}
                        placeholder='Nội dung'
                        value={noiDung}
                        onChangeText={setNoiDung}
                    />
                    <Pressable  onPress={showDatePicker}>
                        <Text >Ngày đăng:</Text>
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={{fontStyle:'italic'}} >{date+""}</Text>
                    <View
                        style={{flexDirection:'row',justifyContent:'space-evenly'}}
                    >
                    <Pressable 
                        onPress={addPost}
                    >
                        <Text style={styles.press}>Thêm</Text>
                    </Pressable>
                    

                    <Text style={styles.press} 
                        onPress={() => setVisible(!visible)}>Đóng</Text>
                    </View>
                    </View>
            </Modal>
        </>
    );
}
const styles=StyleSheet.create({
    text:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginVertical:10
        
    },
    label:{
        margin:15,
        fontSize:15,
    },
    imputText:{
        borderWidth:1,
        margin:5,
        padding:10,
        borderRadius:15
    },
    press:{
        width:100,
        marginTop:20,
        padding:10,
        fontSize:15,
        fontWeight:'bold',
        color:'blue',
        borderWidth:1,
        borderColor:'blue',
        borderRadius:20,
        textAlign:'center',
        
    }
    
})
export default Home