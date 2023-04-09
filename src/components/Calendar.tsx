import { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import MyModal from './Modal';
import MyForm from './Form';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Modal Title');
  const [newEvent, setNewEvent] = useState<Event>();

  const createEvent = (e: any) => {
    setModalTitle(e.start.toString().substring(0, 15));
    setOpenModal(true);

    //console.log(e);
    setNewEvent({ start: e.start, end: e.end });

  }

  const editEvent = (e: any) => {
    setModalTitle(e.start.toString().substring(0, 15));
    setOpenModal(true);
    setNewEvent(e);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(e) => createEvent(e)}
        onSelectEvent={(e) => editEvent(e)}
        style={{ height: '100vh' }}
      />
      <MyModal show={openModal}
        setShow={setOpenModal}
        modalTitle={modalTitle}
        newEvent={newEvent}
        myEventsList={myEventsList}
        setMyEventsList={setMyEventsList} >
        <MyForm newEvent={newEvent} setNewEvent={setNewEvent} />
      </MyModal>
    </div>
  )
}

export default MyCalendar;
