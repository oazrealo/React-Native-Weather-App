import React, { useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import axios  from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAuth, signOut } from 'firebase/auth'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../App'
import { SafeAreaView, StyleSheet, View, Image, Text, Button } from 'react-native'

type WeatherNavigationProp = StackNavigationProp<RootStackParamList, 'Weather'>

interface WeatherScreenProps {
  navigation: WeatherNavigationProp
}

const Weather: React.FC<WeatherScreenProps> = ({ navigation }) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'a0e71296604dc0e2675084f54f251007'

    const [open, setOpen] = useState(false);
    const [city, setCity] = useState([]);
    const [items, setItems] = useState([
        {label: 'Central and Western District', value: ['22.28219','114.14486','Central and Western District']},
        {label: 'Eastern', value: ['22.27722','114.22519','Eastern']},
        {label: 'Islands District', value: ['22.26382','113.96038','Islands District']},
        {label: 'Kowloon City District', value: ['22.32866','114.19121','Kowloon City District']},
        {label: 'Kwai Tsing', value: ['22.35288','114.10004','Kwai Tsing']},
        {label: 'Kwon Tong', value: ['22.31326','114.22581','Kwon Tong']},
        {label: 'North', value: ['22.49471','114.13812','North']},
        {label: 'Sai Kung Area', value: ['22.38198','114.27017','Sai Kung Area']},
        {label: 'Sha Tin', value: ['22.38715','114.19534','Sha Tin']},
        {label: 'Sham Shui Po', value: ['22.32989','114.1625','Sham Shui Po']},
        {label: 'Southern', value: ['22.25801','114.15308','Southern']},
        {label: 'Tai Po District', value: ['22.43995','114.1654','Tai Po District']},
        {label: 'Tsuen Wan District', value: ['22.37908','114.10598','Tsuen Wan District']},
        {label: 'Tuen Mun', value: ['22.39161','113.96792','Tuen Mun']},
        {label: 'Wan Chai', value: ['22.27702','114.17232','Wan Chai']},
        {label: 'Wong Tai Sin', value: ['22.34299','114.19302','Wong Tai Sin']},
        {label: 'Yau Tsim Mong', value: ['22.32105','114.17261','Yau Tsim Mong']},
        {label: 'Yuen Long District', value: ['22.41667','114.05','Yuen Long District']}
    ])

    const [time, setTime] = useState('')
    const [main, setMain] = useState('')
    const [temp, setTemp] = useState('')
    const [temp_min, setTemp_min] = useState('')
    const [temp_max, setTemp_max] = useState('')
    const [humidity, setHumidity] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('unknown')
    const [locale, setLocale] = useState('unknown')
    const [img, setImg] = useState(require('../assets/bg.jpg'))


    const getWeather = async() =>{
        try{
            const con = await NetInfo.fetch().then((state) => state.isConnected)

            if (con) {
                const response = await axios.get(apiUrl,{
                    params: {
                        lat: city[0],
                        lon: city[1],
                        units: 'metric',
                        appid: apiKey
                    }
                })

                const data = [];    
                data.push(
                    response.data.weather[0].description,
                    response.data.main.temp,
                    response.data.main.temp_min,
                    response.data.main.temp_max,
                    response.data.main.humidity,
                    response.data.wind.speed,
                    response.data.weather[0].icon
                )
                
                AsyncStorage.setItem('@time', JSON.stringify(Date()))
                AsyncStorage.setItem('@main', JSON.stringify(data[0]))
                AsyncStorage.setItem('@temp',  JSON.stringify(data[1]))
                AsyncStorage.setItem('@temp_min', JSON.stringify(data[2]))
                AsyncStorage.setItem('@temp_max', JSON.stringify(data[3]))
                AsyncStorage.setItem('@humidity', JSON.stringify(data[4]))
                AsyncStorage.setItem('@wind', JSON.stringify(data[5]))
                AsyncStorage.setItem('@icon', JSON.stringify(data[6]))
                AsyncStorage.setItem('@locale', JSON.stringify(city[2]))

                setTime(Date())
                setMain(data[0])
                setTemp(data[1])
                setTemp_min(data[2])
                setTemp_max(data[3])
                setHumidity(data[4])
                setWind(data[5])
                setIcon(data[6])
                setLocale(city[2])
                
                switch (data[0]) {
                    case 'clear sky':
                        setImg(require('../assets/cs_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/cs_bg.png')))
                        break;
                    case 'few clouds':
                        setImg(require('../assets/fc_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/fc_bg.png')))
                        break;
                    case 'scattered clouds':
                        setImg(require('../assets/sc_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/sc_bg.png')))
                        break;
                    case 'broken clouds':
                        setImg(require('../assets/bc_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/bc_bg.png')))
                        break;
                    case 'shower rain':
                        setImg(require('../assets/sr_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/sr_bg.png')))
                        break;
                    case 'rain':
                        setImg(require('../assets/r_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/r_bg.png')))
                        break;
                    case 'thunderstorm':
                        setImg(require('../assets/t_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/t_bg.png')))
                        break;
                    case 'snow':
                        setImg(require('../assets/s_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/s_bg.png')))
                        break;
                    case 'mist':
                        setImg(require('../assets/m_bg.png'))
                        AsyncStorage.setItem('@img', JSON.stringify(require('../assets/m_bg.png')))
                        break;
                }

            } else {
                alert('No connection! Restoring last weather data.')
                const time = await AsyncStorage.getItem('@time')
                if (time !== null) {
                    setTime(time)
                };
                const main = await AsyncStorage.getItem('@main')
                if (main !== null) {
                    setMain(main)
                };
                const temp = await AsyncStorage.getItem('@temp')
                if (temp !== null) {
                    setTemp(temp)
                };
                const temp_min = await AsyncStorage.getItem('@temp_min')
                if (temp_min !== null) {
                    setTemp_min(temp_min)
                };
                const temp_max = await AsyncStorage.getItem('@temp_max')
                if (temp_max !== null) {
                    setTemp_max(temp_max)
                };
                const humidity = await AsyncStorage.getItem('@humidity')
                if (humidity !== null) {
                    setHumidity(humidity)
                };
                const wind = await AsyncStorage.getItem('@wind')
                if (wind !== null) {
                    setWind(wind)
                };
                const icon = await AsyncStorage.getItem('@icon')
                if (icon !== null) {
                    setIcon(icon)
                };
                const locale = await AsyncStorage.getItem('@locale')
                if (locale !== null) {
                    setLocale(locale)
                }
                const img = await AsyncStorage.getItem('@img')
                if (img !== null) {
                    setImg(img)
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

    const auth = getAuth()
    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            alert('Logout success.')
            navigation.replace('Login')
        })
    }

    return(
        <SafeAreaView style={styles.Container}>
            <Image style={styles.bgContainer} source={img} />
            <DropDownPicker
                theme='DARK'
                placeholder='Select a location'
                open={open}
                value={city}
                items={items}
                setOpen={setOpen}
                setValue={setCity}
                setItems={setItems}
            />
            <View style={styles.textsContainer}>
                <Text style={styles.timeContainer}>{time}</Text>
                <Text style={styles.localeContainer}>{locale}</Text>
                <Image style={styles.imageContainer} source={{uri: 'https://openweathermap.org/img/wn/'+icon+'@4x.png'}} />
                <Text style={styles.mainContainer}>{main}</Text>
                <Text style={styles.tempContainer}>{temp}°C</Text>
                <Text style={styles.tempMinContainer}>min:{temp_min}°C</Text>
                <Text style={styles.tempMaxContainer}>max:{temp_max}°C</Text>
                <Text style={styles.humidityContainer}>humidity:{humidity}%</Text>
                <Text style={styles.windContainer}>wind:{wind}m/s</Text>
            </View>
            <View style={styles.getContainer}>
                <Button title='Get Weather' onPress={getWeather} />
            </View>
            <View style={styles.logoutContainer}>
                <Button title='Logout' onPress={handleLogout} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    bgContainer: {
        position: 'absolute',
        height: 1100
    },
    textsContainer: {
        padding: 5,
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 100,
        width: 250,
        height: 250
    },
    timeContainer: {
        position: 'absolute',
        top: 50,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    localeContainer: {
        position: 'absolute',
        top: 100,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    mainContainer: {
        position: 'absolute',
        top: 350,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    tempContainer: {
        position: 'absolute',
        top: 425,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    tempMinContainer: {
        position: 'absolute',
        top: 475,
        left: 80,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    tempMaxContainer: {
        position: 'absolute',
        top: 475,
        right: 80,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    humidityContainer: {
        position: 'absolute',
        top: 550,
        left: 70,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    windContainer: {
        position: 'absolute',
        top: 550,
        right: 70,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    getContainer: {
        position: 'absolute',
        bottom: 80,
        width: 415,
        padding: 5
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 30,
        width: 415,
        padding: 5
    }
});

export default Weather