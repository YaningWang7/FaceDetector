import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const URL = 'https://fathomless-waters-67750.herokuapp.com';
class App extends Component{
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (box) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: box.left_col * width,
      topRow: box.top_row * height,
      rightCol: width - (box.right_col * width),
      bottomRow: height - (box.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch(`${URL}/predict`, {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(box => {
      this.displayFaceBox(this.calculateFaceLocation(box));
    })
    .catch(console.log);
    fetch(`${URL}/image`, {
      method: "PUT",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
    })
    .catch(console.log);
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home'
            ? <div>
                  <Logo />
                  <Rank currentUser={this.state.user}/>
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onPictureSubmit={this.onPictureSubmit}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
              </div>
            : (
              route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
            )
        }
      </div>
    );
  }  
}

export default App;
