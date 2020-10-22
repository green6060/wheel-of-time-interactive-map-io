import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import { BookNames } from '../../Helper/common';


// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));

const validate = values => {
  const errors = {};
  if (typeof(values.spoilerFilter) !== "boolean") {
    errors.spoilerFilter = 'Please select a valid option (Spoiler filter ON or OFF)'
  }
  if (values.bookOrTvFilter !== 'Book' && values.bookOrTvFilter !== 'Tv Series') {
    errors.bookOrTvFilter = 'Please select a valid response';
  }
  if (
    values.book !== undefined &&
    values.book !== 'The Eye of the World' &&
    values.book !== 'The Great Hunt' &&
    values.book !== 'The Dragon Reborn' &&
    values.book !== 'The Shadow Rising' &&
    values.book !== 'The Fires of Heaven' &&
    values.book !== 'Lord of Chaos' &&
    values.book !== 'A Crown of Swords' &&
    values.book !== 'The Path of Daggers' &&
    values.book !== "Winter's Heart" &&
    values.book !== 'Crossroads of Twilight' &&
    values.book !== 'Knife of Dreams' &&
    values.book !== 'The Gathering Storm' &&
    values.book !== 'Towers of Midnight' &&
    values.book !== 'A Memory of Light'
  ) 
  {
    errors.book = 'Please select a valid book title'
  }
  // if (
  //   values.season !== undefined ||
  //   values.season !== '1' ||
  //   values.season !== '2' ||
  //   values.season !== '3' ||
  //   values.season !== '4' ||
  //   values.season !== '5'
  // ) {
  //   errors.season = 'Please select a valid season'
  // }
  return errors;
}

export default function RightDrawer() {
  // const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      spoilerFilter: false, 
      bookOrTvFilter: '', 
      book: undefined, 
      // chapter: undefined,
      // season: undefined,
      // episode: undefined,
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      console.log('values: ' + values)
      setSubmitting(false)
   }},
  )

  const handleFilterChange = (e, value) => {
    formik.setFieldValue('bookOrTvFilter', '')
    formik.setFieldValue('book', undefined)
    formik.setFieldValue('spoilerFilter', value)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControlLabel
          style={{display: 'flex', justifyContent: 'center'}}
          control={
            <Switch
              name="spoilerFilter"
              checked={formik.spoilerFilter} 
              onChange={handleFilterChange} 
              value={formik.values.spoilerFilter}
            />
          }
          label="Remove Spoilers?"
          labelPlacement="start"
        />
      </FormGroup>
      {formik.errors.spoilerFilter && formik.touched.spoilerFilter && formik.errors.spoilerFilter}

      {formik.values.spoilerFilter === true &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SelectDropdown
            formik={formik} 
            options={['Book', 'Tv Series']} 
            multiple={false} 
            id={'bookOrTvFilter'}
            label={'Book or Tv Series?'}
            acceptAny={false}
          />
          {formik.errors.bookOrTvFilter && formik.touched.bookOrTvFilter && formik.errors.bookOrTvFilter}
        </div>
      }

      {(formik.values.bookOrTvFilter === 'Book' || formik.values.bookOrTvFilter === 'Tv Series') &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <SelectDropdown 
            formik={formik}
            options={BookNames}
            multiple={false}
            id={'book'}
            label={'Select a Book Title'}
          />
          {formik.errors.book && formik.touched.book && formik.errors.book}
        </div>
      }
      <div style={{display: 'flex', justifyContent: 'center', margin: '5px'}}>
        <button type='submit' disabled={true}>
          Save
        </button>
      </div>
    </form>
  );
}