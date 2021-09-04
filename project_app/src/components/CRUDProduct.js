import React, { Component } from "react";
import axios from 'axios';

export default class CreateProduct extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRetrieve = this.onRetrieve.bind(this);
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
        "deleteId": "",
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

  onChangeDeleteID = (e) => {
    this.setState({
        deleteId: e.target.value
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
    if (this.state.id === "" || this.state.name === "" || this.state.price === "") {
      alert("Please fill in these fields: ID, Name and Price");
      return
    }

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
      .then((res) => {
        console.log(res.data);
        alert("Inserted Successfully!")
      }).catch(err => alert(err));

    // We will empty the state after posting the data to the database
    this.clearFields();
  }

  onRetrieve(e) {
    e.preventDefault();

    if (this.state.id === "") {
      alert("Please fill in ID to retrieve a product");
      return
    }

    axios.get("http://localhost:5000/api/products/" + this.state.id)
    .then((res) => {
        this.setState({
            createdAt: res.data.data.createdAt,
            name: res.data.data.name,
            price: res.data.data.price,
            description: res.data.data.description,
            image: res.data.data.image,
            tags: res.data.data.tags
        })
    }).catch(err => alert(err));
  }

  async onEdit(e) {
    e.preventDefault();
    if (this.state.id === "" || this.state.name === "" || this.state.price === "") {
      alert("Please fill in these fields: ID, Name and Price");
      return
    }

    const newProduct = {
        "id": this.state.id,
        "createdAt": this.state.createdAt,
        "updatedAt": Date(),
        "name": this.state.name,
        "price": this.state.price,
        "description": this.state.description,
        "image": this.state.image,
        "tags": this.state.tags,
    };

    axios.post("http://localhost:5000/api/products/" + newProduct.id, newProduct)
    .then((res) => {
      console.log(res.data);
      alert("Updated Successfully!")
    }).catch(err => alert(err));

    // We will empty the state after posting the data to the database
    this.clearFields();
  }

  onDelete(e) {
    e.preventDefault();
    if (this.state.deleteId === "") {
      alert("Please enter Delete Product ID")
      return
    }
    axios
    .delete("http://localhost:5000/api/products/" + this.state.deleteId)
    .then((res) => {
      console.log(res.data);
      alert("Deleted Successfully!")
    }).catch(err => alert(err));

    // We will empty the state after posting the data to the database
    this.clearFields();
  }

  clearFields() {
    this.setState({
      id: "",
      createdAt: "",
      updatedAt: "",
      name: "",
      price: 0.00,
      description: "",
      image: "",
      tags: [],
      tagName: "",
      deleteId: ""
  });
  }

  showTags() {
      return this.state.tags.map(x => <li>{x}</li>)
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div>
      <div style={{ marginTop: 20 }}>
        <h3>Fill in the form to create a new product</h3>
        <form>
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
              min="0"
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
          <div>
            <input
              value="Create Product"
              className="btn btn-primary"
              onClick={this.onSubmit}
            />
          </div>
          <div>
            <input
              value="Retrieve Product"
              className="btn btn-primary"
              onClick={this.onRetrieve}
            />
          </div>
          <div>
            <input
              value="Edit Product"
              className="btn btn-primary"
              onClick={this.onEdit}
            />
          </div>
        </form>
      </div>
      <div style={{ marginTop: 20 }}>
      <h3>Enter a Product ID to delete</h3>
      <form>
        <div className="form-group">
          <label>Delete Product ID: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.deleteId}
            onChange={this.onChangeDeleteID}
          />
        </div>
        </form>
        <div>
            <input
              value="Delete Product"
              className="btn btn-primary"
              onClick={this.onDelete}
            />
          </div>
        </div>
        </div>
    );
  }
}