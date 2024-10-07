import { StyleSheet, View, Image, Dimensions, TextInput } from "react-native";
import Swiper from 'react-native-swiper';
import sliderImages from './SliderImages';


function HomeTab ({ navigation }) {

    const { width } = Dimensions.get('window');
    const height = width * 0.6; // maintain a 16:9 aspect ratio

    return (
            <View style={styles.container}>
                <View>
                {/* <TextInput style={styles.input}
                    onFocus={() => navigation.navigate('Search for product')}
                    placeholder="Search by name or category"
                /> */}
                </View>    
                <View style={styles.swiper}>
                    <Swiper
                        autoplay
                        height={height}
                        showsButtons={false}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                    >
                        {sliderImages.map((item) => (
                        <View key={item.id} style={styles.slide}>
                            <Image source={item.imageUrl} style={styles.image} />
                        </View>
                        ))}
                    </Swiper>
                </View>
            </View>   
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    swiper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
      },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
      },
      image: {
        width: 370,
        height: 250,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
      },
      activeDot: {
        backgroundColor: '#000',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
    },
})
export default HomeTab;