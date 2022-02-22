import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onFindPetsClick = () => {
    let baseURL = '/api/pets';

    if (this.state.filters.type !== 'all'){
      baseURL += `?type=${this.state.filters.type}`;
    }

    fetch(baseURL)
      .then(resp => resp.json())
      .then(pets => {
        this.setState({
          pets: pets
        })
      })
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map( p => {
      return p.id === id ? { ...p, isAdopted: true} : p;
    });
    this.setState({pets: pets})
  };

  onChangeType= (e) => {
    this.setState({
      filters: { 
        ...this.state.filters, 
        type: e.target.value}
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
