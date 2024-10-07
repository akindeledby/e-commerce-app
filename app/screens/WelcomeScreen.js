import { StyleSheet, Text, View, Image, ImageBackground, Button } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
function WelcomeScreen ({ navigation }) {


    return (
            <ImageBackground
                blurRadius={5}
                source={require('../../app/assets/welcome_image.jpg')} style={styles.backgroundImage} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.welcomeMessage_1}>Welcome...</Text>
                    </View>    
                    <View>
                        <Image style={styles.welcomeImage} source={require('../../app/assets/shopping-trolly.png')} /> 
                    </View>
                    <View>
                        <Text style={styles.welcomeMessage_2}>STORE 360.</Text>
                        <Text style={styles.welcomeMessage_3}>Your Trusted Online Shopping Pal...</Text>
                    </View>
                    <View>
                    <Button style={styles.start_shopping} title='Start Shopping' onPress={() => navigation.navigate('Welcome to Our Store')}/>
                    </View>
                </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 15,
        width: "90%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    backgroundImage: {
        flex: 1,
        objectFit: 'cover',
        width: '100%',
        height: '100%'
      },
    welcomeMessage_1: {
        fontSize: 30,
        color: "#7C4DFF",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeMessage_2: {
        fontSize: 50,
        color: "blue"
    },
    welcomeMessage_3: {
        fontSize: 30,
        color: "black"
    },
    welcomeImage: {
        width: 350,
        height: 350,
        alignItems: 'center'
    },
    start_shopping: {
        padding: 50,
        borderWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FF6B6B'
    }
})
export default WelcomeScreen;







