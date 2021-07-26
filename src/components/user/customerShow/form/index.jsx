import React from 'react';
import {BlockGridItem100, BlockGridItem33, BlockGridItemData} from "../../../../screen/CustomerPage/index.styled";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DenseTable from "../table";
import {useForm} from "react-hook-form";
import {customerGetThunk, СustomerRegistrationThunk} from "../../../../redux/thunk/customer";
import {useDispatch} from "react-redux";


export default function CustomerForm() {
    const {register, control, handleSubmit, watch, formState: {errors}, reset} = useForm();
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        if (!data) return
        await dispatch(СustomerRegistrationThunk(data.phone))
        // avatar.value,
        await reset();
        await dispatch(customerGetThunk())
    }


    return (
        <>
            <div>
                <BlockGridItem33>
                    <p>Добавить сотрудника</p>
                    <BlockGridItemData>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField {...register("phone",
                                {
                                    required: 'Не может быть пустым',
                                    pattern: {
                                        value: /^\+?[1-9]\d{1,14}$/i,
                                        message: 'Навильный формат',
                                    },
                                })}
                                       id="phone"
                                       label="Телефон"
                                       error={errors.phone}
                                       helperText={errors?.phone?.message && errors.phone.message} />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Добавить сотрудника
                            </Button>
                        </form>
                    </BlockGridItemData>
                </BlockGridItem33>
            </div>
        </>
    );
}
