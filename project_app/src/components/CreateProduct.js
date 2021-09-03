import React, { Component } from "react";
import axios from 'axios';

export default class CreateProduct extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        "id": "",
        "createdAt": "",
        "updatedAt": "",
        "name": "",
        "price": 0.00,
        "description": "",
        "image": "",
        "tags": [],
        "tagName":"",
    };
  }

  onChangeID = (e) => {
      this.setState({
          id: e.target.value
      })
  }

  onChangeName = (e) => {
    this.setState({
        name: e.target.value
    })
  }

  onChangePrice = (e) => {
    this.setState({
        price: e.target.value
    })
  }

  onChangeDescription = (e) => {
    this.setState({
        description: e.target.value
    })
  }

  onChangeImage = (e) => {
    this.setState({
        image: e.target.value
    })
  }

  onChangeTagName = (e) => {
    this.setState({
        tagName: e.target.value
    })
  }

  onAdd = () => {
      var tags = this.state.tags
      tags.push(this.state.tagName)
      this.setState({
          tagName: "",
          tags: tags
      })
  }
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
        "id": this.state.id,
        "createdAt": Date(),
        "updatedAt": Date(),
        "name": this.state.name,
        "price": this.state.price,
        "description": this.state.description,
        "image": this.state.image,
        "tags": this.state.tags,
      };

      axios
      .post("http://localhost:5000/api/products", newProduct)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
        id: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        price: 0.00,
        description: "",
        image: "",
        tags: [],
        tagName:"",
    });
  }

  showTags() {
      return this.state.tags.map(x => <li>{x}</li>)
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Fill in the form to create a new product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.id}
              onChange={this.onChangeID}
            />
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input
              type="number"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Product image</label>
            <input
              type="text"
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
            />
          </div>
          <p>Product Tags</p>
          <input
              type="text"
              className="form-control"
              value={this.state.tagName}
              onChange={this.onChangeTagName}
            /> 
            <input
            value="Add"
            className="btn btn-primary"
            onClick={this.onAdd}
            />
            <p>{this.showTags()}</p>
          <div className="form-group">
            <input
              type="submit"
              value="Create Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}