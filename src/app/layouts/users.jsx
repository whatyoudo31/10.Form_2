import React from "react";
import { useParams } from "react-router-dom";
import SingleUserPage from "../components/page/singleUserPage/singleUserPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId } = useParams();
    return (
        <>{userId ? <SingleUserPage userId={userId} /> : <UsersListPage />}</>
    );
};

export default Users;
