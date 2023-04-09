import React, { useState, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Event } from 'react-big-calendar';

interface Props {
  show: boolean;
  setShow: Function;
  modalTitle: string;
  children?: ReactNode;
  newEvent?: Event;
  myEventsList: Event[];
  setMyEventsList: Function;
}

const MyModal = ({ show, setShow, modalTitle, newEvent, children, myEventsList, setMyEventsList }: Props) => {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    let eventList = [...myEventsList];
    if (newEvent) eventList.push(newEvent);
    setMyEventsList(eventList);
    setShow(false);
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;

