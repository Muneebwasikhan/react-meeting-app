
import React, { Component } from "react";
import { DatePicker } from "antd";
import './index.css';


const { RangePicker } = DatePicker;

class DateTimePicker extends Component {
  constructor() {
    super();
    this.state = {};
  }
  onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }
  onOk = (value) => {
    console.log("onOk: ", value);
    this.props.getTime(value);
  }
  
  render() {
    return (
      <div class="bg-modal">
      <div class="modal-contents">
      
        <div class="close" onClick={() => {this.props.disablePicker()}}>+</div>
        <p className='setDT'>Set Date & Time</p>
        <DatePicker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        onChange={this.onChange}
        onOk={this.onOk}
      />
  
      </div>
    </div>
      
    );
  }
}

export default DateTimePicker;