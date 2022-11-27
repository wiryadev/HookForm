import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { useGetUserByIdQuery } from '../../services/userApi'

const DetailScreen = ({ route, navigation }) => {

  const theme = useTheme()

  const id = route.params.id
  const { data, isLoading } = useGetUserByIdQuery(id)
  const detailUser = data?.data

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={detailUser?.name || 'Detail User'}
        />
        <Appbar.Action icon="delete" onPress={() => { }} />
      </Appbar.Header>
      <ScrollView>

      </ScrollView>
    </View>
  )
}

export default DetailScreen