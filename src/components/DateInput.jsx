/* eslint-disable react/prop-types */
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS

const DatePicker = ({ name }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    toggleCalendar(); // Hide the calendar after selecting a date
  };

  return (
    <div>
      <label htmlFor='dateInput'>Select a date:</label>
      <div>
        <input
          id={name}
          type='text'
          value={date.toDateString()} // Display selected date in input
          onClick={toggleCalendar} // Show calendar on input click
          readOnly // Make input read-only to prevent manual input
        />
        {showCalendar && (
          <Calendar
            onChange={handleDateChange}
            value={date}
            onClickDay={handleDateChange} // Hide the calendar when a day is clicked
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
