import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AppDatePicker = ({ name, value, onChange, ...others }) => {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  useEffect(() => {
    !!value && setSelectedDate(value)
  }, [value])

  useEffect(() => {
    onChange && onChange({ target: { name, value: selectedDate, type: 'datePicker' } })
  }, [selectedDate])

  return <DatePicker name={name} selected={value} onChange={handleDateChange} dateFormat="dd/MM/yyyy" className="custom-datepicker" {...others} />
}
AppDatePicker.propTypes = { name: PropTypes.string, value: PropTypes.any, onChange: PropTypes.func }

export default AppDatePicker
