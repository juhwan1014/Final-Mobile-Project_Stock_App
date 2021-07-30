import { StyleSheet } from 'react-native';

// Background #22343C
// Lighter Background #2A3C44
// Green #3DD598
// Red #FF575F
// Yellow #FFC542
// Grey #96A7AF

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    flexDirection: 'column',
    backgroundColor: '#22343C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingLg: {
    color: 'white',
    fontWeight: '700',
    fontSize: 35,
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  headingMd: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    alignSelf: 'center',
    margin: '5%',
  },
  headingSm: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
    margin: '5%',
  },
});
