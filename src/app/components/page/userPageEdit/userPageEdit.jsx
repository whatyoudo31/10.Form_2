import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import * as yup from "yup";
import Loader from "../../common/Loader";

const UserPageEdit = ({ userId }) => {
    const history = useHistory();
    const [errors, setErrors] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [data, setData] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,

                profession: data.profession,
                sex: data.sex,
                qualities: data.qualities
            });
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);
    const validateScheme = yup.object().shape({
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно")
    });

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        // return Object.keys(errors).length === 0;
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // if (!isValid) return;

        api.users.update(userId, data);
        history.push(`/users/${userId}`);
    };

    const handleChange = (target) => {
        console.log("target", target);
        if (target.name === "qualities") {
            console.log("HAHA", target.name);
            const arrToDefault = target.value.map((q) => ({
                _id: q.value,
                name: q.label,
                color: qualities[
                    Object.keys(qualities).filter(
                        (key) => qualities[key]._id === q.value
                    )
                ].color
            }));
            setData((prevState) => ({
                ...prevState,
                [target.name]: arrToDefault
            }));
        }
        if (target.name !== "qualities") {
            setData((prevState) => ({
                ...prevState,
                [target.name]:
                    target.name === "profession"
                        ? professions[
                              Object.keys(professions).find(
                                  (profession) =>
                                      professions[profession]._id ===
                                      target.value
                              )
                          ]
                        : target.value
            }));
        }
    };

    if (data) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form>
                                <TextField
                                    label="Имя"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    // error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    options={professions}
                                    defaultOption="Choose..."
                                    // error={errors.profession}

                                    value={data.profession._id}
                                    label="Выбер свою профессию"
                                    onChange={handleChange}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    label="Выберите ваши качества"
                                    defaultValue={data.qualities}
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                />
                                <div className="d-flex justify-content-between">
                                    {" "}
                                    <button
                                        className="btn btn-primary flex-fill"
                                        onClick={() =>
                                            history.push(`/users/${userId}`)
                                        }
                                    >
                                        <i className="bi bi-arrow-left"></i>
                                        Назад
                                    </button>
                                    <div className="flex-fill" />
                                    <button
                                        // disabled={!isValid}
                                        className="btn btn-primary flex-fill"
                                        onClick={handleSubmit}
                                    >
                                        Обновить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return <Loader />;
};

export default UserPageEdit;

UserPageEdit.propTypes = {
    userId: PropTypes.string
};
