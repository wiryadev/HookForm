import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { useGetUserByIdQuery } from '../../services/userApi'

const DetailScreen = ({ route, navigation }) => {

  const theme = useTheme()

  const id = route.params.id
  const { data, isLoading } = useGetUserByIdQuery(id)
  console.log('detailUser', data)


  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={data?.name || 'Detail User'}
        />
        <Appbar.Action icon="delete" onPress={() => { }} />
      </Appbar.Header>
      <ScrollView>

      </ScrollView>
    </View>
  )
}

export default DetailScreen