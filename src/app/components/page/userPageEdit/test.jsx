import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";

const Test = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",

        profession: "",
        sex: "",
        qualities: ""
    });
    useEffect(() => {
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
    console.log(data);
    if (data) {
        return <h1>{data.name}</h1>;
    }
    return "Loading...";
};

export default Test;

Test.propTypes = {
    userId: PropTypes.string
};
