import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];

const styles = {
  customWidth: {
    width: 150,
    maxHeight: 300
  },
  floatingLabel: {
    left: 0
  }
};



export default class SelectDropDown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
    for (let i = 0; i < this.props.ddData.length; i++) {
      items.push(<MenuItem value={this.props.ddData[i]._id} key={this.props.ddData[i]._id} primaryText={this.props.ddData[i].name} />);
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange}
        floatingLabelText="Select Album"
        floatingLabelFixed={false}
        floatingLabelStyle={styles.floatingLabel}
        style={styles.customWidth}
          >
        {items}
      </SelectField>
    );
  }
}
