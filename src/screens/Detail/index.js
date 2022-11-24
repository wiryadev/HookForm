import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'

const DetailScreen = ({ navigation }) => {
  const theme = useTheme()
  
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Detail Screen"
        />
        <Appbar.Action icon="delete" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView>

      </ScrollView>
    </View>
  )
}

export default DetailScreen