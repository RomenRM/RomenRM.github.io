import React, { Component } from 'react';
import './ChampionCard.css'

export default class ChampionCard extends Component {
  render() {
    const datosCampeon = this.props.datos;
    const img = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + datosCampeon.id + '_0.jpg';
    const backgroundImg = {
      background: `url(` + img + `) no-repeat center top`,
      backgroundSize: `cover`,
    };
    return (
      <div className="championCard" style={backgroundImg}>
        <p>{datosCampeon.name}</p>
      </div>
    );
  }
}
