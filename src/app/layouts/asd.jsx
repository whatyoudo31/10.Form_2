import React from "react";
import Users from "../components/users";
import { useParams } from "react-router-dom";
import OneOfUsers from "./oneOfUsers";

const asd = () => {
    const { userId } = useParams();
    console.log(userId);
    return <>{userId ? <OneOfUsers userId={userId} /> : <Users />}</>;
};

export default asd;
