import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BlockGridItem33, BlockGridItemData } from "./index.styled";
import { useForm } from "react-hook-form";
import CustomTextField from "../../../../partials/inputs/text";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import CustomSelect from "../../../../partials/inputs/select";
import CustomButton from "../../../../partials/button";
import { EventPostThunk } from "../../../../redux/thunk/event";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlockGridItem50 } from "../../../../screen/CustomerPage/index.styled";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
}));

const EventForm = ({ triggerUpdate }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [valueBody, setValueBody] = useState("");
  const [is_published, setIsPublished] = useState(true);

  const onSubmit = async (data) => {
    if (!data) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", valueBody);
    formData.append("address", data.address);
    formData.append("max_attendee", data.max_attendee);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("video", data.video);
    if (data.img[0]) formData.append("img", data.img[0]);
    formData.append("is_published", data.is_published === true ? 1 : 0);
    await EventPostThunk(formData, triggerUpdate);
    reset();
  };

  return (
    <div>
      <BlockGridItem50>
        <p>Добавить мероприятие</p>
        <BlockGridItemData>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <TextField
                inputProps={register("title", {
                  required: "Не может быть пустым",
                })}
                id="title"
                label="Название мероприятия"
                error={errors.title}
                helperText={errors?.title?.message && errors.title.message}
              />
            </FormControl>
            <FormControl>
              {/* <CustomTextField inputProps={register("body", {required: 'Не может быть пустым'})}
                                             id="body"
                                             label="Описание"
                                             error={errors.body}
                                             helperText={errors?.body?.message && errors.body.message}/> */}
              <ReactQuill
                theme="snow"
                value={valueBody}
                onChange={setValueBody}
              />
              <br />
            </FormControl>
            <FormControl>
              <TextField
                inputProps={register("address", {
                  required: "Не может быть пустым",
                })}
                id="address"
                label="Адрес"
                error={errors.address}
                helperText={errors?.address?.message && errors.address.message}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Время начала"
                type="datetime-local"
                error={errors.start_date}
                inputProps={register("start_date")}
                id="start_date"
                helperText={
                  errors?.start_date?.message && errors.start_date.message
                }
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Время начала"
                type="datetime-local"
                error={errors.end_date}
                inputProps={register("end_date")}
                id="end_date"
                helperText={
                  errors?.end_date?.message && errors.end_date.message
                }
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                inputProps={register("max_attendee", {
                  required: "Не может быть пустым",
                })}
                id="max_attendee"
                label="Кол-во участников"
                error={errors.max_attendee}
                helperText={
                  errors?.max_attendee?.message && errors.max_attendee.message
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                inputProps={register("video")}
                id="video"
                placeholder="Ссылка на видео"
                error={errors.video}
                helperText={errors?.video?.message && errors.video.message}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="is_published-label">Опубликован</InputLabel>
              <CustomSelect
                inputProps={register("is_published")}
                labelId="is_published-label"
                name="is_published"
                defaultValue={false}
                id="is_published"
                error={!!errors.is_published}
              >
                <MenuItem value={true}>Да</MenuItem>
                <MenuItem value={false}>Нет</MenuItem>
              </CustomSelect>
            </FormControl>

            <FormControl>
              <input
                {...register("img")}
                accept="image/*"
                style={{ display: "none" }}
                id="img"
                type="file"
              />
              <label htmlFor="img">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>

              {/*{avatar ?*/}
              {/*    <a href={avatar}>*/}
              {/*        <img className={classes.table_img} src={process.env.REACT_APP_BASE_URL + avatar}/></a>*/}
              {/*    :*/}
              {/*    <img className={classes.table_img} src="/img/template/no-image.png"/>*/}
              {/*}*/}
            </FormControl>

            <FormControl>
              <CustomButton
                variant="contained"
                // color="primary"
                type="submit"
              >
                Добавить мероприятие
              </CustomButton>
            </FormControl>
          </form>
        </BlockGridItemData>
      </BlockGridItem50>
    </div>
  );
};

export default EventForm;
