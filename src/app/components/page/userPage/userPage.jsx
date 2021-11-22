import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Встретился {user.completedMeetings} раз</p>
                <b>Оценка: {user.rate}</b>
                <p>
                    <button onClick={handleClick}>Все пользователи</button>
                </p>
            </div>
        );
    }
    return "Loading";
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string
};
