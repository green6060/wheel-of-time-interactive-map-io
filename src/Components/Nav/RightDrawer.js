import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useFormik } from 'formik';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import { axiosCreateUser, BookNames, UserContext } from '../../Helper/common';
// import Background from 'https://www.transparenttextures.com/patterns/handmade-paper.png'


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
  const userContext = React.useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // axiosCreateUser(email, password)
    // .then(res => {console.log(res)})
    // .catch(err => {console.log(err)})
  }

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
    onSubmit: (event, values) => {
      event.preventDefault()
      console.log(values)
      axiosCreateUser('UserTest', 'UserTestPw').then(console.log('success')).catch(console.log('failure'))
   }},
  )

  const handleFilterChange = (e, value) => {
    formik.setFieldValue('bookOrTvFilter', '')
    formik.setFieldValue('book', undefined)
    formik.setFieldValue('spoilerFilter', value)
  }
  return (

    <form 
      // style={{
      //   height: '100%',
      //   backgroundImage: "url(https://www.transparenttextures.com/patterns/light-paper-fibers.png)",
      //   backgroundColor: '#CEC395',
      // }}
    >
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
        <button onClick={handleSubmit} disabled={false}>
          Save
        </button>
      </div>
    </form>
  );
}

// onClick={(event) => {event.preventDefault();console.log('onsubmit formik'); axiosCreateUser('UserTest', 'UserTestPw').then(console.log('success')).catch(console.log('failure'))}}