import React from "react";
import { useParams } from "react-router-dom";

import UserPageEdit from "../userPage/userPageEdit";
import UserPage from "../userPage";
import PropTypes from "prop-types";

const SingleUserPage = ({ userId }) => {
    const { edit } = useParams();

    return (
        <>
            {edit ? (
                <UserPageEdit userId={userId} />
            ) : (
                <UserPage userId={userId} />
            )}
        </>
    );
};

export default SingleUserPage;

SingleUserPage.propTypes = {
    userId: PropTypes.string
};
