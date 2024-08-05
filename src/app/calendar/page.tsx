"use client";

import React, { useState, useEffect } from 'react';
import './../Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray:any = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push("");
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setDays(daysArray);
  }, [currentDate]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="day">{day}</div>
        ))}
      </div>
      <div className="dates">
        {days.map((day, index) => (
          <div key={index} className="date">{day}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
