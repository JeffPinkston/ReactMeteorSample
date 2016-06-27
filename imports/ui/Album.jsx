import React, { Component, PropTypes } from 'react';

import { Albums } from '../api/albums.js';

import MenuItem from 'material-ui/MenuItem';

//Task component - representsa single todo item
export default class Album extends Component {

  deleteThisAlbum() {
    Albums.remove(this.props.album._id);
  }

  render() {

    return (
      <MenuItem value={this.props.album._id} primaryText={this.props.album.name}/>
    );
  }
}

Album.propTypes = {
  //This component gets the task to display through a React prop.
  //We can use propTypes to indicate it is required
  album: PropTypes.object.isRequired
}
