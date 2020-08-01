import React, { useState, Fragment } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App ({
  apiKey: 'f9eb110890ba444096cf3f8eab091106'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = box => {
    console.log(box);
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      input
    )
    .then(response => displayFaceBox(calculateFaceLocation(response)))
    .catch(error => console.log(error));
  }

  const onRouteChange = route => {
    if (route === 'signin') {
      // Want to diplay signin screen when clicked signout
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? 
      <Fragment>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl} />
      </Fragment> : (
        route === 'signin' ? 
        <SignIn onRouteChange={onRouteChange} /> :
        <Register onRouteChange={onRouteChange} />
      )
      }
    </div>
  );
}

export default App;
