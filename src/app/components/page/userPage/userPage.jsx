import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/";
import { Link } from "react-router-dom";
import UserPageEdit from "./userPageEdit";

const UserPage = ({ userId, edit }) => {
    // const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    if (user) {
        return edit ? (
            <UserPageEdit edit={edit} />
        ) : (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Встретился {user.completedMeetings} раз</p>
                <b>Оценка: {user.rate}</b>
                <p>
                    <Link to={`${userId}/edit`}>
                        <button
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Изменить
                        </button>
                    </Link>
                </p>
            </div>
        );
    }
    return "Loading...";
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string,
    edit: PropTypes.string
};
