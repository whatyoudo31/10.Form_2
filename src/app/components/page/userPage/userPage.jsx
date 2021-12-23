import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import QualitiesList from "../../ui/qualities/";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import CommentsList from "../../ui/comments/сommentsList";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link to={`${userId}/edit`}>
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i className="bi bi-gear"></i>
                                    </button>
                                </Link>

                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            Профессия: {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="bi bi-caret-down-fill text-primary"
                                                role="button"
                                            ></i>
                                            <i
                                                className="bi bi-caret-up text-secondary"
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Качества</span>
                                </h5>
                                <p className="card-text">
                                    <QualitiesList qualities={user.qualities} />
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Встретился</span>
                                </h5>
                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                                <h5 className="card-title">
                                    <span>раз</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <CommentsList userId={userId} />
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string,
    user: PropTypes.object,
    edit: PropTypes.string
};
