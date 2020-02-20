import React, { Component } from 'react';
import Axios from 'axios';
import './ChampionContainer.css';
import ChampionCard from '../ChampionCard/ChampionCard';

export default class ChampionContainer extends Component {
  state = {
    campeones: [],
    campeonesFiltrados: [],
  };

  componentDidMount() {
    Axios.get(`http://ddragon.leagueoflegends.com/cdn/10.3.1/data/es_ES/champion.json`).then(response => {
      this.setState({ campeones: response.data.data });
    });
  }

  render() {
    const listaCampeones = this.state.campeones;
    console.log(listaCampeones);
    return (
      <div className="championContainer">
        {/* La API envia los valores en una lista de objetos, por lo que para recorrerlo debemos utilizar Object.entries(listaCampeones)*/}
        {Object.entries(listaCampeones).map((campeon, index) => (
          <ChampionCard key={index} datos={campeon[1]} />
        ))}
      </div>
    );
  }
}
