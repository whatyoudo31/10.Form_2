import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "../components/qualitiesList";
import { Link } from "react-router-dom";

const OneOfUsers = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log("ВЫБРАННЫЙ ЮЗЕР", user);
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h3>Профессия: {user.profession.name}</h3>
                <QualitiesList qualities={user.qualities} />
                <p>Встретился {user.completedMeetings} раз</p>
                <b>Оценка: {user.rate}</b>
                <p>
                    <Link to="/users">
                        <button>Все пользователи</button>
                    </Link>
                </p>
            </div>
        );
    }
    return "Loading";
};

export default OneOfUsers;

OneOfUsers.propTypes = {
    userId: PropTypes.string
};
