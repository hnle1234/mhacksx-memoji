import {key} from './lock'
import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  CameraRoll,
} from 'react-native';

export default class App extends React.Component {
  state = {
    oldUri: require('./Emoji/default_emoji.jpg'),
    imgUri: require('./Emoji/default_emoji.jpg'),
    emoji: false,
    res: ''
  }

  render() {
    console.log(this.state.res);
    return (
      <View style={styles.container}>
        <View ref={(ref) => this.memeView = ref}>
          <Image
            style={{ width: 300, height: 300 }}
            source={this.state.imgUri}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onTakePic}>
            <Text style={styles.buttonText}>take a pic!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onSave}>
            <Text style={styles.buttonText}>save!</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._memePic(this.state.imgUri)}>
            <Text style={styles.buttonText}>emoji!</Text>
          </TouchableOpacity>
        </View>
        {this.state.res[0] != undefined ? <Text>{this.state.res[0].scores.anger}</Text> : null}
      </View>
    );
  }

  _memePic(imgUri) {
    this.setState({emoji: true});
    // fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/', {
    //   method: 'POST',
    //   headers: {
    //     'Ocp-Apim-Subscription-Key': {key},
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     url: {imgUri}
    //   })
    // }).then((response) => response.json())
    //  .then((responseJson) => { this.setState({ res: responseJson}); });
  }

  _onTakePic = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: {uri:uri} });
    }
  }

  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.memeView, {});
    await CameraRoll.saveToCameraRoll(uri);
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    alignSelf: 'stretch',
  },
  text: {
    position: 'absolute',
    left: 5, right: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonText: {
    fontSize: 21,
  },
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: '#ddd',
  },
  container: {
    marginTop: Expo.Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});