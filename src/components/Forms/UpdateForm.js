import React from 'react';
import { Form, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Update.css'

class UpdateForm extends React.Component {
  state = {
    experience: this.props.experience,
    modal: true
  };


  handleChanges = e => {
    e.preventDefault()
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.name]: e.target.value
      }
    })
  }
  

  updateExperience = e => {
    this.props.editExperience(e, this.state.experience);
  };
  
  
toggle=()=> {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}



  render() {
    return (
      <div className="edit-form-wrapper">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader >Update Experience</ModalHeader>
          <ModalBody>
          <Form className="edit-form" >
          <Label htmlFor="name">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChanges}
            value={this.state.experience.title}
          />

          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            placeholder="Date"
            onChange={this.handleChanges}
            value={this.state.experience.date}
          />

          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            name="location"
            placeholder="Location"
            onChange={this.handleChanges}
            value={this.state.experience.location}
          />

          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            placeholder="Price"
            onChange={this.handleChanges}
            value={this.state.experience.price}
          />

          <Label htmlFor="description">Description</Label>
          <Input
            type='textarea'
            name="description"
            placeholder="Description"
            onChange={this.handleChanges}
            value={this.state.experience.description}
           />
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateExperience}>Save changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateForm;
