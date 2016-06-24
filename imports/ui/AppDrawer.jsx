import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class AppDrawer extends Component {
  constructor(props) {
    super(props);
    console.log('Props: ' + props.open);
    this.props.open = props.open;
  }

  toggleDrawer(){
    console.log('ToggleDrawer: ' + this.props.open);
    this.props.open = !this.props.open;
  }

  handleClose() {
    console.log('handleClose 1: ' + this.props.open);
    this.props.open = !this.props.open;
    console.log('handleClose 2: ' + this.props.open);
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={this.handleClose.bind(this)}
      >
      <AppBar title="Menu"
        iconElementLeft={<IconButton onClick={this.handleClose.bind(this)}><NavigationClose /></IconButton>}
        />
        <MenuItem onClick={this.handleClose.bind(this)}>Bands</MenuItem>
        <MenuItem onClick={this.handleClose.bind(this)}>Albums</MenuItem>
      </Drawer>
    )
  }
}
