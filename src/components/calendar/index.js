import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { coffeeGetUserWorkingTimeThunk } from "../../redux/thunk/coffee";
import { Button } from "@material-ui/core";
import CalendarModal from "./modal";
import {
  calendarShowThunk,
  CalendarShowThunk,
} from "../../redux/thunk/calendar";
import { BlockGridItem33 } from "../../screen/CustomerPage/index.styled";
import { customerGetThunk } from "../../redux/thunk/customer";
require("moment/locale/ru.js");
const localizer = momentLocalizer(moment);

let formats = {
  timeGutterFormat: "HH:mm",
  agendaDateFormat: "Y-m-d H:i:s",
  agendaTimeFormat: "Y-m-d H:i:s",
};

const CalendarMain = () => {
  let { id } = useParams();

  const [positionsList, setPositionList] = useState(null);
  const [open, setOpenModal] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dataUser, setDataUser] = useState();

  const [myEventsList, setEventsList] = useState(null);

  useEffect(() => {
    getWorking();
  }, [dataUser]);

  const getWorking = () => {
    if (id && dataUser) calendarShowThunk(id, handleDataCallback);
  };

  useLayoutEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    customerGetThunk(handleDataCallbackUser);
  };

  const handleDataCallbackUser = (data) => {
    if (!data) return;
    setDataUser(data);
  };

  const handleDataCallback = (data) => {
    if (!data) return;
    if (dataUser) {
      var positions = data.map((item) => {
        let userName = dataUser.find((user) => user.id === item.user_id).name;
        var obj = {};
        if (userName) obj["title"] = userName;
        if (item?.user?.name) obj["title"] = item.user.name;
        if (item?.user?.name) obj["desc"] = item.user.name;
        obj["start"] = new Date(item.working_date_from);
        obj["end"] = new Date(item.working_date_to);
        return obj;
      });
    }

    setEventsList(positions);
  };

  const handleClickOpen = () => {
    setOpen();
  };

  const setOpen = () => {
    setOpenModal(true);
  };

  const setClose = () => {
    setOpenModal(false);
  };

  const handleSelectSlot = (event) => {
    if (event.start) setStart(new Date(event.start)); //due of undefined reason we need convert in again
    if (event.end) setEnd(new Date(event.end)); //due of undefined reason we need convert in again
    setOpen();
  };
  const messages = {
    // new
    allDay: "Все дни",
    previous: "Предыдущий",
    next: "Следующий",
    today: "Сегодня",
    month: "Месяц",
    week: "Неделя",
    day: "День",
    agenda: "Повестка дня",
    date: "Дата",
    time: "Время",
    event: "Сотрудники",
    sunday: "ss",
  };

  return (
    <div>
      {/* <BlockGridItem33>
                <Button
                    variant="contained"
                    // color="primary"
                    type="submit"
                    onClick={handleClickOpen}
                >
                    Добавить время +
                </Button>
            </BlockGridItem33> */}

      <div>
        <ul>
          {positionsList &&
            positionsList.map((positions, index) => (
              <li key={index}>{positions}</li>
            ))}
        </ul>
      </div>

      {myEventsList && (
        <Calendar
          localizer={localizer}
          formats={formats}
          events={myEventsList}
          messages={messages}
          startAccessor="start"
          endAccessor="end"
          selectable="true"
          defaultView={Views.WEEK}
          style={{ height: 600 }}
          onSelectSlot={handleSelectSlot}
          onDoubleClickEvent={() => alert("d")}
          allDayAccessor={true}
        />
      )}

      {open && <CalendarModal {...{ open, setOpen, setClose, start, end, getWorking }} />}
    </div>
  );
};

export default CalendarMain;
