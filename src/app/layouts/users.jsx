import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserPageEdit from "../components/page/userPageEdit";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            {userId ? (
                edit ? (
                    <UserPageEdit userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
