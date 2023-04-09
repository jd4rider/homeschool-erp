import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Event } from 'react-big-calendar';
import { ChangeEvent } from 'react';
import Timepicker from './Timepicker';
import { useEffect, useState } from 'react';

interface Props {
  newEvent?: Event;
  setNewEvent: Function;
}

const MyForm = ({ newEvent, setNewEvent }: Props) => {
  const [allDay, setAllDay] = useState<boolean>(false);
  const [allDayPicked, setAllDayPicked] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>('');

  const handleTitleOnChange = (e: ChangeEvent) => {
    let title = (e.target as HTMLInputElement).value
    setTitleValue(title);
    let changeEvent: Event = { title: title, end: newEvent?.end, start: newEvent?.start };
    setNewEvent(changeEvent);
  }

  const handleAllDayChange = () => {
    setAllDay(!allDay);
    setAllDayPicked(true);
  }

  useEffect(() => {
    if (newEvent) {
      // @ts-ignore
      if (Math.abs(newEvent.end - newEvent.start) / 36e5 == 24 && !allDayPicked) setAllDay(true);
      if (newEvent.title) setTitleValue(newEvent.title as string)
    }
  }, [newEvent])

  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Event Title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="My Cool Title" value={titleValue} onChange={e => handleTitleOnChange(e)} />
      </FloatingLabel>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="All day Event?"
        checked={allDay}
        onChange={handleAllDayChange}
      />
      {!allDay &&
        <>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Timepicker currentDateTime={newEvent?.start} eventTargetAttribute={'start'} newEvent={newEvent} setNewEvent={setNewEvent} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Timepicker currentDateTime={newEvent?.end} eventTargetAttribute={'end'} newEvent={newEvent} setNewEvent={setNewEvent} />
          </Form.Group>
        </>
      }
      {/*<FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>*/}
    </>
  );
}

export default MyForm;
