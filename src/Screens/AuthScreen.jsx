import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../redux/ducks/auth';

export default function AuthScreen(props) {

  const { navigate } = props.navigation;

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  const passChange = () => {
    setPasswordError(null);
  };

  const emailChange = () => {
    setEmailError(null);
  };

  const handleClick = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      return setEmailError('Email не может быть пустым');
    }
    if (!re.test(String(email).toLowerCase())) {
      return setEmailError('Некорректные данные email');
    }
    if (!password) {
      return setPasswordError('Пароль не может быть пустым');
    }
    if (password.length < 6) {
      return setPasswordError(' Пароль должен содержать минимум 6 символов');
    }
    if (password.length !== 0 && /\s/.test(password)) {
      return setPasswordError('В пароле не может быть пробелов');
    }
    dispatch(login(email, password));
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={50} // (when scroll)to have extra height between keyboard and text input
        enableOnAndroid={true}
        extraHeight={50} // make some height so the keyboard wont cover other component
        contentContainerStyle={styles.container}
      >
        <Image style={styles.logo} source={require('../../assets/bg2.png')} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: 70,
          }}
        >
          Уроки таджвида
        </Text>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          type="email"
          name="email"
          value={email}
          onChangeText={setEmail}
          onChange={emailChange}
        />
        <Text style={styles.title} htmlFor="password">
          Пароль
        </Text>
        <TextInput
          style={styles.input}
          type="password"
          name={password}
          value={password}
          onChangeText={setPassword}
          onChange={passChange}
        />
        <View
          style={{
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            title="Pick an auth"
            onPress={handleClick}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                textTransform: 'capitalize',
                color: '#fff',
              }}
            >
              Войти
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={styles.btnRegistration}
            title="Pick an auth"
            onPress={() => navigate('RegistrationScreen')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                textTransform: 'capitalize',
                color: '#fff',
              }}
            >
              Регистрация
            </Text>
          </TouchableOpacity>
        </View>
        {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
        {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 150,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  title: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#fff',
  },

  input: {
    width: width - 80,
    height: 50,
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: '#ffffff',
    color: '#000',
    fontSize: 13,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  btn: {
    marginHorizontal: 'auto',
    width: 170,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#004741',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  btnRegistration: {
    marginHorizontal: 'auto',
    borderWidth: 0,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
