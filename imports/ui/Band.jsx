import React, { Component, PropTypes } from 'react';

import { Bands } from '../api/bands.js';

//Task component - representsa single todo item
export default class Band extends Component {

  deleteThisBand() {
    Bands.remove(this.props.band._id);
  }

  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisBand.bind(this)}>
          &times;
        </button>

        <span className="text">
          <strong>{this.props.band.name}</strong>
        </span>
      </li>
    );
  }
}

Band.propTypes = {
  //This component gets the task to display through a React prop.
  //We can use propTypes to indicate it is required
  band: PropTypes.object.isRequired
}
