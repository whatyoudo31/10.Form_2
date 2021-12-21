import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    const defaultValueToArray =
        (Array.isArray(defaultValue) &&
            defaultValue.map((item) => ({
                label: item.name,
                value: item._id,
                color: item.color
            }))) ||
        [];

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                defaultValue={defaultValueToArray}
                closeMenuOnSelect={false}
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MultiSelectField;
