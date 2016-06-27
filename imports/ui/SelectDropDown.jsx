import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];


export default class SelectDropDown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      data: this.props.ddData
    }
    for (let i = 0; i < this.state.data.length; i++) {
      items.push(<MenuItem value={this.state.data[i]._id} key={this.state.data[i]._id} primaryText={this.state.data[i].name} />);
    }
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <SelectField maxHeight={300} value={this.state.value} onChange={this.handleChange.bind(this)}>
        {items}
      </SelectField>
    );
  }
}
