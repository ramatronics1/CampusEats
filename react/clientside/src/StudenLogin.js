import React, { Component } from 'react';
import axios from 'axios';

class StudentForm extends Component {
  state = {
    usn: '',
    dob: '',
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    // Prepare data to be sent
    const formData = {
      usn: this.state.usn,
      dob: this.state.dob,
    };

    try {
      const response = await axios.post('http://192.168.1.42:5000/clientLogin', formData);

      console.log(response.data); // Log the response from the server

      // You can update the state or perform other actions based on the response if needed
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <div className="container">
        <h1>Authentication</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="usn">USN (University Serial Number):</label>
          <input
            type="text"
            id="usn"
            name="usn"
            value={this.state.usn}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.state.dob}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Authenticate</button>
        </form>
      </div>
    );
  }
}

export default StudentForm;
