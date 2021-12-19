import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserPageEdit = ({ userId }) => {
    // const user = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log("UserPageEdit user", user);
    const history = useHistory();
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",

        profession: "",
        sex: "",
        qualities: ""
    });
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        setData({
            name: user.name,
            email: user.email,

            profession: user.profession,
            sex: user.sex,
            qualities: user.qualities
        });
    }, []);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;

        const formatArray = data.qualities.map((q) => ({
            _id: q.value,
            name: q.label,
            color: "success"
        }));

        api.users.update(userId, { ...data, qualities: formatArray });
        history.push(`/users/`);
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    if (user) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
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
                                    // error={errors.email}
                                />
                                <SelectField
                                    options={professions}
                                    defaultOption="Choose..."
                                    // error={errors.profession}

                                    value={data.profession}
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
                                <button
                                    // disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto m-2"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return "Загрузка..";
};

export default UserPageEdit;

UserPageEdit.propTypes = {
    userId: PropTypes.string,
    user: PropTypes.object
};
