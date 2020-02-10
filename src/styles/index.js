import {Dimensions} from 'react-native';

const width = {
  100: Dimensions.get('window').width,
  80: Dimensions.get('window').width * 0.8,
  60: Dimensions.get('window').width * 0.6,
  34: Dimensions.get('window').width * 0.34,
  33: Dimensions.get('window').width * 0.33,
  32: Dimensions.get('window').width * 0.32,
  31: Dimensions.get('window').width * 0.31,
  30: Dimensions.get('window').width * 0.3,
  29: Dimensions.get('window').width * 0.29,
  28: Dimensions.get('window').width * 0.28,
  27: Dimensions.get('window').width * 0.27,
  17: Dimensions.get('window').width * 0.17,
  14: Dimensions.get('window').width * 0.14,
  50: Dimensions.get('window').width * 0.5,
  40: Dimensions.get('window').width * 0.4,
  20: Dimensions.get('window').width * 0.2,
  10: Dimensions.get('window').width * 0.1,
  5: Dimensions.get('window').width * 0.05,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  input: {
    width: width['80'],
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  textCenter: {
    justifyContent: 'center',
  },
  viewSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  btnAdd: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: 50,
    marginBottom: 25,
    marginRight: 25,
  },
  errorInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  errorValidation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width['80'],
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    marginBottom:30,
  }
};

export default styles;
