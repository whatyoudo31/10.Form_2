import React, { useState, useEffect } from "react";
import Comment from "./comment";
import PropTypes from "prop-types";
import api from "../../../api";
import SelectField from "../../common/form/selectField";

const CommentsList = ({ userId }) => {
    const [userComments, setUserComments] = useState([]);
    const [allUsers, setAllUsers] = useState();
    const [data, setData] = useState();
    const [newCommentValue, setNewCommentValue] = useState("");
    const [isSubmit, setIsSubmit] = useState(1);
    const [error, setError] = useState();

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comments) => setUserComments(comments));
        api.users.fetchAll().then((data) => setAllUsers(data));
    }, [isSubmit]);

    function handleDelete(commentId) {
        api.comments.remove(commentId);
        setUserComments(
            userComments.filter((comment) => comment._id !== commentId)
        );
    }

    const handleChange = (target) => {
        setData(target.value);
    };

    const handleSubmitNewComment = () => {
        const userCommentId = allUsers.filter((user) => user.name === data)[0]
            ._id;
        api.comments.add({
            userId: userCommentId,
            pageId: userId,
            content: newCommentValue
        });
        setIsSubmit(isSubmit + 1);
        setNewCommentValue("");
    };
    // ---------- СОРТИРОВКА ----------
    const sortedComments = userComments.sort(
        (a, b) => b.created_at - a.created_at
    );
    console.log("sortedComments", sortedComments);

    // ---------- ВАЛИДАЦИЯ ----------

    useEffect(() => {
        if (newCommentValue.trim() === "") {
            setError("Поле с комментарием обязательно для заполнения!");
        } else setError("");
    }, [newCommentValue]);
    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <div>
                        <h2>Новый комментарий</h2>
                        <div className="mb-4">
                            <SelectField
                                options={allUsers}
                                // error={errors.profession}

                                value={data}
                                label="Выбер свою профессию"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Сообщение
                            </label>
                            <textarea
                                className={"form-control " + getInputClasses()}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={newCommentValue}
                                onChange={({ target }) => {
                                    setNewCommentValue(target.value);
                                }}
                            ></textarea>
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                            <button
                                onClick={handleSubmitNewComment}
                                className="btn btn-primary mt-3 d-flex justify-content-end"
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Комментарии</h2>
                    <hr />
                    {sortedComments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommentsList;

CommentsList.propTypes = {
    userId: PropTypes.string
};
