import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core';

export default function SelectDropdown({formik, options, multiple, id, label, disabled, acceptAny}) {

    return (
        <Autocomplete
            multiple={multiple}
            size="small"
            style={{ width: 200 }}
            id={id}
            name={id}
            options={options}
            getOptionLabel={(options) => options}
            onChange={(e, value) => {
                formik.setFieldValue(id, value)
            }}
            disabled={disabled}
            freeSolo={acceptAny}
            openOnFocus
            renderInput={params => (
                <TextField 
                    {...params} 
                    name={id}
                    label={label}
                    variant="outlined"
                    style={{margin: '5px 0'}}
                />
            )}
        />
    )
}