import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditModal = ({ isOpen, toggleModal, userId, currentUser }) => {
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  

  useEffect(() => {
    if (currentUser) {
      setNewFullName(currentUser.fullName || ''); // Initialize newFullName with currentUser's fullname
      setNewEmail(currentUser.email || ''); // Initialize newEmail with currentUser's email
      
    }
  }, [currentUser]);
  console.log(currentUser.fullName);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newFullName') {
      setNewFullName(value);
    } else if (name === 'newEmail') {
      setNewEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to update the fullname and email in the database
      await axios.put(`http://localhost:8000/user/update/${userId}`, {
        fullName: newFullName,
        email: newEmail
      });

      toggleModal(); // Close the modal after successful update
      toast.success('Profile updated successfully'); // Display success toast message
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Modal show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newFullName">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              placeholder={currentUser ? currentUser.fullName || 'Enter fullname' : 'Enter fullname'}
              name="newFullName"
              value={newFullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="newEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={currentUser ? currentUser.email || 'Enter email' : 'Enter email'}
              name="newEmail"
              value={newEmail}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileEditModal;
