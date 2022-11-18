import { View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDown from 'react-native-paper-dropdown'
import { useController } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { HelperText } from 'react-native-paper'

const DropdownMenu = ({
  name, control, defaultValue, ...props
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { field, formState: { errors } } = useController(
    { control, name, defaultValue }
  )

  return (
    <View>
      <DropDown
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        dropDownStyle={{
          marginBottom: 16,
          paddingBottom: 16,
        }}
        value={field.value}
        setValue={field.onChange}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message} style={{ fontSize: 12 }}>
            {message}
          </HelperText>
        )}
      />
    </View>
  )
}

export default DropdownMenu