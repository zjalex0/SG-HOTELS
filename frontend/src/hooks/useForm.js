import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onResetForm = () => {
    setValues(initialState)
  }

  const onLoadForm = (state) => {
    setValues(state)
  }

  const onInputChange = ({ target }) => {
    if (target.type === 'checkbox') {
      setValues({
        ...values,
        [target.name]: target.checked,
      })
    } else {
      setValues({
        ...values,
        [target.name]: target.value,
      })
    }
  }

  return [values, onInputChange, onResetForm, onLoadForm]
}
