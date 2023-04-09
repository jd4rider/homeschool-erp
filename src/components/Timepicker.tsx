import { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import { Event } from 'react-big-calendar';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

interface Props {
  currentDateTime?: Date;
  newEvent?: Event;
  setNewEvent?: Function;
  eventTargetAttribute?: String;
}

const Timepicker = ({ currentDateTime, newEvent, setNewEvent, eventTargetAttribute }: Props) => {
  const [value, setValue] = useState<string>('10:00');

  const timeSelect = (e: any) => {
    let newDate;
    if (newEvent && eventTargetAttribute) {
      // @ts-ignore
      newDate = new Date(newEvent[eventTargetAttribute])
      if (eventTargetAttribute == 'end' && newEvent.start) newDate.setDate(newEvent.start.getDate())
      newDate.setHours(parseInt(e.split(':')[0]))
      newDate.setMinutes(parseInt(e.split(':')[1]))
      // @ts-ignore
      newEvent[eventTargetAttribute] = newDate;
      if (setNewEvent) {
        setNewEvent(newEvent);
        setValue(e)
      }
    }
  }

  useEffect(() => {
    if (currentDateTime) {
      let date = new Date(currentDateTime);
      let hours = date.getHours();
      let mins = date.getMinutes();
      setValue(`${hours}:${mins}`);
    }
  }, [currentDateTime])

  return (
    <div>
      <TimePicker onChange={(e) => { timeSelect(e) }} value={value} />
    </div>
  );
}

export default Timepicker;
