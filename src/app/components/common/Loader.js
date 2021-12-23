import React from "react";

const Loader = () => {
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        margin: "2em"
    };

    return (
        <div style={loaderStyle}>
            <div className="lds-ellipsis">
                <b className="load">Загрузка...</b>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
