import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import FormattedInputs from "../../components/elements/phoneInput";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "./index.styled";
import SmsIcon from "@material-ui/icons/Sms";
import DenseTable from "../../components/elements/table";
import { useDispatch, useSelector } from "react-redux";
import { CustomerGetThunk, СustomerRegistrationThunk } from "../../redux/thunk/customer";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";


const CastomerPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    // const [phoneDat, setPhoneData] = useState()
    const customer = useSelector(store => store.customer.customer)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const onSubmit = async (data) => {
        if (!data) return
        await dispatch(СustomerRegistrationThunk(data.phone))
        // avatar.value, 
        await reset();
        await dispatch(CustomerGetThunk())
    }

    // const onSubmitResetPass = async (data) => {
    //     if (!data) return
    //     await dispatch(СustomerRegistrationThunk(data.phone))
    //     // avatar.value, 
    //     await reset();
    //     await dispatch(CustomerGetThunk())
    // }



    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(CustomerGetThunk())
        } else {
            history.push('/')
        }
    }, [])


    return (
        <div className="container">
            <Menu />
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
                {/* <BlockGridItem33>
                    <p>Восстановить пароль юзера</p>
                    <BlockGridItemData>

                        <form onSubmit={handleSubmit(onSubmitResetPass)}>
                            <TextField {...register("phone", { required: 'Не может быть пустым' })}
                                id="phone"
                                label="Название"
                                error={errors.phone}
                                helperText={errors?.phone?.message && errors.phone.message}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Добавить категорию
                            </Button>
                        </form>
                    </BlockGridItemData>
                </BlockGridItem33> */}
                <BlockGridItem100>
                    <p>Все сотрудники</p>
                    <DenseTable rows={customer} />

                </BlockGridItem100>
            </div>

        </div>
    )
}

export default CastomerPage;
