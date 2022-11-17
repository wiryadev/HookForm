
import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { useController } from 'react-hook-form'
import { View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

const TextField = ({
  name, control, defaultValue, ...props
}) => {
  const { field, formState: { errors } } = useController({ control, name, defaultValue })

  return (
    <View>
      <TextInput
        ref={field.ref}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        {...props}
      />
      {/* <ErrorMessage
        errors={ }
      /> */}
      <HelperText visible={errors} type='error'>
        {errors?.message}
      </HelperText>
    </View>
  )
}

export default TextField