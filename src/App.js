import React, { useState } from "react";
import { getMonth } from "./utils/calendar";
import { addMonths, format, isSameDay, isSameMonth, subMonths } from "date-fns";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const data = getMonth(currentDate)();

  /**
   * Function that set the date of the next month
   */
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  /**
   * Function that set the date of the previous month
   */
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  /**
   * Function that return week names of the month
   */
  const WeekNames = () => {
    return (
      <div className="grid grid-cols-7">
        {" "}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div
            className={" bg-blue-200 h-16 flex items-center justify-center "}
            key={dayName}
          >
            {dayName}
          </div>
        ))}
      </div>
    );
  };

  /**
   * Function that return previous month and next month buttons
   */
  const TabMonth = () => {
    return (
      <div class="grid grid-cols-3 gap-4 flex">
        <button
          class="bg-purple-400 col-start-1 col-end-2"
          onClick={() => prevMonth()}
        >
          prev
        </button>
        <div>{format(currentDate, "MMMM")}</div>
        <button
          class="bg-purple-400 col-end-5 col-span-2"
          onClick={() => nextMonth()}
        >
          next
        </button>
      </div>
    );
  };

  /**
   * function that change color text of day's number and show color on todays date
   * @param day
   * @returns
   */
  const dayColor = (day) => {
    if (!isSameMonth(day, new Date())) {
      return "text-blue-600";
    }

    if (isSameDay(day, new Date())) {
      return "bg-blue-600";
    }
  };

  /**
   * function that return the number of the day
   *
   * @returns
   */
  const DaysOfMonths = () => {
    return (
      <div>
        {data.map((week) => (
          <div className="grid grid-cols-7">
            {week.map((day) => (
              <div
                className={`hover:bg-purple-500 h-16 flex items-center justify-center border border-blue-200 ${dayColor(
                  day
                )}`}
                key={day}
              >
                {format(day, "dd")}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className=" bg-white box-border m-8 flex">
      <div className="bg-white border round-md">
        <TabMonth />
        <WeekNames />
        <DaysOfMonths />
      </div>
    </div>
  );
}
