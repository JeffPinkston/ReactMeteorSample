import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Bands } from '../api/bands.js';
import { Albums } from '../api/albums.js';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Task from './Task.jsx';
import Band from './Band.jsx';
import Album from './Album.jsx';
import SelectDropDown from './SelectDropDown.jsx';
import AppDrawer from './AppDrawer.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const paperStyle = {
  textAlign: 'center'
}

//App component - represents the whole App
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      hideCompleted: false,
      currentState: 'albums',
      albumName: ''
    }
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose(e) {
    this.setState({
      currentState:  e.target.innerText.toLowerCase(),
      open: false
    });
  }

  handleBandSubmit(event) {
    event.preventDefault();

    //find the text field via the React Reference
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Bands.insert({
      name: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

    //clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleAlbumSubmit(event) {
    event.preventDefault();

    //find the text field via the React Reference
    const text = this.refs.textInput.props.value.trim();

    Albums.insert({
      artist: 'Pearl Jam',
      name: text,
      createdAt: new Date()
    });

    //clear form
    this.refs.textInput.props.value = '';
    this.state.albumName = '';
    this.renderAlbumSelect()
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  toggleDrawer(){
    this.setState({
      open: !this.state.open
    });
  }

  renderBands() {
    let bands = this.props.bands;
    return bands.map((band) => (
      <Band key={band.id} band={band} />
    ));
  }

  renderAlbums() {
    let albums = this.props.albums;
    return albums.map((album) => (
      <Album key={album._id} album={album}/>
    ));
  }

  renderAlbumSelect() {
    return (
      <SelectDropDown value={this.props.selectedAlbum} ddData={this.props.albums} />
    );
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if(this.state.hideCompleted){
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  handleAlbumInput(event) {
    this.setState({
      albumName: event.target.value
    });
  }

  handleAlbumChange(event, index, value) {
    this.setState({
      selectedAlbum: value
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            iconElementLeft={<IconButton onClick={this.handleToggle.bind(this)}><NavigationMenu /></IconButton>}/>

          <div id="albums">
              <Paper style={paperStyle} zDepth={1}>
                <form className="new-task" onSubmit={this.handleAlbumSubmit.bind(this)} >
                  <TextField
                    id="album-name"
                    ref="textInput"
                    hintText="Album Name"
                    value={this.state.albumName}
                    onChange={this.handleAlbumInput.bind(this)}
                    />
                </form>
                {this.props.albumCount !== 0 ?
                  this.renderAlbumSelect() : ''
                }
            </Paper>
          </div>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={this.toggleDrawer.bind(this)}
        >
        <AppBar title="Menu"
          iconElementLeft={<IconButton onClick={this.handleClose.bind(this)}><NavigationClose /></IconButton>}
          />
          <MenuItem refs='bandsMenuItem' onClick={this.handleClose.bind(this)}>Bands</MenuItem>
          <MenuItem refs='albumsMenuItem' onClick={this.handleClose.bind(this)}>Albums</MenuItem>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  albums: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    bands: Bands.find({}).fetch(),
    albums: Albums.find({}).fetch(),
    tasks: Tasks.find({}, {sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
    albumCount: Albums.find({}).count()
  };
}, App);
