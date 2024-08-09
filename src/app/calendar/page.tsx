"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./../Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);
  const [daysInMonth, setDaysInMonth] = useState(0);

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    setFirstDayOfMonth(firstDay);
    setDaysInMonth(daysInMonth);

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push("");
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setDays(daysArray);
  }, [currentDate]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const images = {
    summer: "/images/summer.png",
    winter: "/images/winter.png"
  };

  const getSeasonImage = () => {
    const month = currentDate.getMonth();
    if (month >= 2 && month <= 8) return images.summer;
    return images.winter;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="frame">
          <Image src={getSeasonImage()} width={300} height={300} alt="season" />
        </div>
        <div className="calendar">
          <div className="header">
            <button className="nav-button prev" onClick={prevMonth}>
              &lt;
            </button>
            <h1 className="header_title">
              {monthNames[currentDate.getMonth()]}
            </h1>
            <p className="header_subtitle">
              {currentDate.getFullYear()}
            </p>
            <button className="nav-button next" onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div className="days-of-week">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <p key={index} className="day-name">
                {day}
              </p>
            ))}
          </div>
          <div className="days">
            {days.map((day, index) => (
              <p
                key={index}
                className={`day-number ${
                  day === "" || index < firstDayOfMonth || index >= daysInMonth + firstDayOfMonth
                    ? "day-number_disabled"
                    : isToday(day) ? "highlight" : ""
                }`}
              >
                {day}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
