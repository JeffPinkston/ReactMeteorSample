import React, { Component, PropTypes } from 'react';

import { Albums } from '../api/albums.js';

//Task component - representsa single todo item
export default class Album extends Component {

  deleteThisAlbum() {
    Albums.remove(this.props.album._id);
  }

  render() {

    return (
      <li>
        <button className="delete" onClick={this.deleteThisAlbum.bind(this)}>
          &times;
        </button>

        <span className="text">
          <strong>{this.props.album.name}</strong>
        </span>
      </li>
    );
  }
}

Album.propTypes = {
  //This component gets the task to display through a React prop.
  //We can use propTypes to indicate it is required
  album: PropTypes.object.isRequired
}
