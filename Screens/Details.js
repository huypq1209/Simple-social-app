import React, { useState, useEffect } from 'react'
import {
    StyleSheet, FlatList, Platform, Modal,
    Image, Pressable, Text, View, Alert,
    TextInput, ActivityIndicator,ScrollView
} from 'react-native'
import firebase from '../Utilities/firebaseDb'

const Details = props => {
    const { navigation, route: { params: { key } } } = props
    
    const [post, setPost] = useState(null)
    const [visible, setVisible] = useState(false)

    const [tieuDe, setTieuDe] = useState('')
    const [noiDung, setNoiDung] = useState('')
    const [isLoading, setIsLoading] = useState(false)
     
    useEffect(async () => {
        const res = await firebase.firestore()
            .collection('news')
            .doc(key).get()
        if (res.exists) {
            const { title, body,img } = res.data()
            setPost({ title, body, img, key: res.id })
            setTieuDe(post.title)
            setNoiDung(post.body)
        }
        return res
    }, [key])
    
    const deletePost = async () => {
        try {
            await firebase.firestore()
                .collection('news').doc(key).delete()
            navigation.navigate('Home')
        } catch (error) {
        }
    } 
    const updatePost = async () => {
        try {
            await firebase.firestore()
                .collection('news').doc(key).update({body:noiDung, title:tieuDe })
            navigation.navigate('Home')
        } catch (error) {
        }
    }
    const confirmDelete = () => {
        Alert.alert(
            'Cảnh báo!!!', 
            'Bạn có chắc không?',        
            [
                {text: 'Có', onPress: deletePost},
                {text: 'Không', onPress: () => console.log('Ban da chon KHONG')}
            ],
            {
                cancelable: true,
                onDismiss: () => console.log('ONDISMISS')
            }
        )
    }
   
    if (!post) {
        return (<></>)
    }

    return (
        <>
         <ScrollView>  
        <View>
            <View style={{
               
                flex:1,
                
            }}>
                <Text style={{ fontSize: 30,
                            color:'black',
                            marginBottom:20,
                            
                            backgroundColor:'lightblue',
                            padding:20,
                            borderBottomRightRadius:60,
                            borderColor:'black', }}>{post.title}</Text>
                <Image style={{width:'95%',height:300,margin:'2%',borderRadius:5}} source={{uri:post.img}} />            
                <Text style={{ fontSize: 15,color:'black',margin:10 }}>{post.body}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
                <Pressable onPress={confirmDelete}>
                    <Text style={styles.press}>Delete</Text>
                </Pressable>

                <Pressable  onPress={() => {
                    setTieuDe(post.title)
                    setNoiDung(post.body)
                    setVisible(true)}}>
                    <Text style={styles.press}>Update</Text>
                </Pressable>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
               
            >
                <View 
                    style={{
                        backgroundColor:'white',
                        marginTop:'30%',
                        margin: 20,
                        padding: 15,
                        borderRadius: 20,
                        height: 250,
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
                    
                    <View
                        style={{flexDirection:'row',justifyContent:'space-evenly'}}
                    >
                    <Pressable 
                        onPress={updatePost}
                    >
                        <Text style={styles.press}>Lưu</Text>
                    </Pressable>
                    

                    <Text style={styles.press} 
                        onPress={() => setVisible(!visible)}>Đóng</Text>
                    </View>
                </View>
                
            </Modal>
        </View>
        </ScrollView> 
        </>
    )
}
const styles = StyleSheet.create({
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
        color:'white',
        borderRadius:20,
        textAlign:'center',
        backgroundColor:'#CC6633'
    }
})

export default Details