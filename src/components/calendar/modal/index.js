import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomModal from "../../../partials/modal";
import CalendarForm from "../form";

const CalendarModal = ({ open, setOpen, setClose, start, end, getWorking }) => {
  return (
    <CustomModal
      {...{ open, setOpen, setClose }}
      title={"Добавить смену"}
    >
      <CalendarForm {...{ start, end, setClose, getWorking }} />
    </CustomModal>
  );
};

export default CalendarModal;
