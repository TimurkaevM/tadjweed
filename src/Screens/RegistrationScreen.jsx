import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { registration, ChangeError } from '../redux/ducks/auth';

function RegistrationScreen() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);

  console.log(confirmed);

  const emailChange = (e) => {
    setEmailError(null);
  };
  const nameChange = (e) => {
    setNameError(null);
  };
  const passwordChange = (e) => {
    setPasswordError(null);
  };
  const confirmedChange = (e) => {
    setPasswordError(null);
  };

  const handleClick = (e) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name) {
      return setNameError('Имя не может быть пустым');
    }
    if (name.length < 3) {
      return setNameError('В имени не может быть меньше 3 символов');
    }
    if (!email) {
      return setEmailError('Email не может быть пустым');
    }
    if (!re.test(String(email).toLowerCase())) {
      return setEmailError('Некорректные данные email');
    }
    if (!password) {
      return setPasswordError('пароль не может быть пустым');
    }
    if (password !== confirmed) {
      return setPasswordError('Неверный пароль подтверждения');
    }
    if (password.length < 6) {
      return setPasswordError('Пароль должен содержать минимум 6 символов');
    }
    if (password.length !== 0 && /\s/.test(password)) {
      return setPasswordError('В пароле не может быть пробелов');
    }

    dispatch(registration(email, name, password, confirmed));
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
        extraHeight={20} // make some height so the keyboard wont cover other component
        contentContainerStyle={styles.container}
      >
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
          Логин
        </Text>
        <TextInput
          style={styles.input}
          type="name"
          name={name}
          value={name}
          onChangeText={setName}
          onChange={nameChange}
        />
        <Text style={styles.title} htmlFor="password">
          Пароль
        </Text>
        <TextInput
          style={styles.input}
          type="email"
          name="email"
          value={password}
          onChangeText={setPassword}
          onChange={passwordChange}
        />
        <Text style={styles.title} htmlFor="password">
          Подтверждение пароля
        </Text>
        <TextInput
          style={styles.input}
          type="password"
          name="confirmed"
          value={confirmed}
          onChangeText={setConfirmed}
          onChange={confirmedChange}
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
        {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
        {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
        {nameError && <Text style={{ color: 'red' }}>{nameErrnull}</Text>}
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
  title: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#fff',
  },
  image: {
    flexGrow: 1,
    justifyContent: 'center',
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

export default RegistrationScreen;
