
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import {Button, TextField} from "@material-ui/core";
import {BlockGridItem33, BlockGridItemData} from "./index.styled";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
  }));

const CityForm = ({data}) => {
    const classes = useStyles();

    return (
        <div>
            <BlockGridItem33>
                <p>Добавить мероприятие</p>
                <BlockGridItemData>
                    {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
                    {/*    <TextField {...register("name", { required: 'Не может быть пустым' })}*/}
                    {/*               id="name"*/}
                    {/*               label="Название города"*/}
                    {/*               error={errors.name}*/}
                    {/*               helperText={errors?.name?.message && errors.name.message}*/}
                    {/*    />*/}
                    {/*    <Button*/}
                    {/*        variant="contained"*/}
                    {/*        color="primary"*/}
                    {/*        type="submit"*/}
                    {/*    >*/}
                    {/*        Добавить город*/}
                    {/*    </Button>*/}
                    {/*</form>*/}
                </BlockGridItemData>
            </BlockGridItem33>
        </div>
    )
}

export default CityForm;
