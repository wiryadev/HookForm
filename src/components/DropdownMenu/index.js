import { View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDown from 'react-native-paper-dropdown'

const DropdownMenu = (props) => {
  const [showDropDown, setShowDropDown] = useState(false)
  return (
    <DropDown
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      dropDownStyle={{
        marginBottom: 16,
        paddingBottom: 16,
      }}
      {...props}
    />
  )
}

export default DropdownMenu