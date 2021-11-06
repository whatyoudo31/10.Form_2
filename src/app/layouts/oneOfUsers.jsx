import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
// import QualitiesList from "../components/qualitiesList";

const OneOfUsers = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log("ВЫБРАННЫЙ ЮЗЕР", user);
    return user && <h1>{user.name}</h1>;
};

export default OneOfUsers;

OneOfUsers.propTypes = {
    userId: PropTypes.string
};
