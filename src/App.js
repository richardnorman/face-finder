import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App ({
  apiKey: 'f9eb110890ba444096cf3f8eab091106'
})

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

  const onInputChange = (event) => {
    setInput({ input: event.target.value })
  }

  const onButtonSubmit = () => {
    setImageUrl({ imageUrl: input });
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      input)
      .then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
