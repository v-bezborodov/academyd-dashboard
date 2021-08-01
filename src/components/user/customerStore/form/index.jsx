import React from 'react';
import {BlockGridItem33, BlockGridItemData} from "../../../../screen/CustomerPage/index.styled";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {customerGetThunk, СustomerRegistrationThunk} from "../../../../redux/thunk/customer";
import {useDispatch} from "react-redux";
import {FormControl} from "@material-ui/core";


export default function CustomerForm({triggerUpdate}) {
    const {register, control, handleSubmit, watch, formState: {errors}, reset} = useForm();
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        console.log()
        if (!data) return
        await СustomerRegistrationThunk(data, triggerUpdate);
        // avatar.value,
        await reset();
        // await customerGetThunk(triggerUpdate);
    }


    return (
        <>
            <div>
                <BlockGridItem33>
                    <p>Добавить сотрудника</p>
                    <BlockGridItemData>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                            <TextField inputProps={register("phone",
                                {
                                    required: 'Не может быть пустым',
                                    pattern: {
                                        value: /^\+?[1-9]\d{1,14}$/i,
                                        message: 'Навильный формат',
                                    },
                                }
                                )}
                                       id="phone"
                                       placeholder="Телефон"
                                       error={!!errors.phone}
                                       helperText={errors?.phone?.message && errors.phone.message} />

                            </FormControl>
                            {/*<FormControl>*/}
                            {/*    <TextField name="name"*/}
                            {/*               placeholder={"Name"}*/}
                            {/*               error={!!errors.name}*/}
                            {/*               helperText={errors?.name?.message && errors.name.message}*/}
                            {/*               autoFocus*/}
                            {/*               inputProps={*/}
                            {/*                   register('name', {required: 'Не может быть пустым'})*/}
                            {/*               }*/}
                            {/*    />*/}
                            {/*</FormControl>*/}
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
