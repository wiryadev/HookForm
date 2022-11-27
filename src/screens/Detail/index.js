import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { ActivityIndicator, Appbar, Avatar, Text, useTheme } from 'react-native-paper'
import Spacer from '../../components/Spacer'
import { BASE_URL } from '../../services/baseApi'
import { useGetUserByIdQuery } from '../../services/userApi'

const DetailScreen = ({ route, navigation }) => {

  const theme = useTheme()

  const id = route.params.id
  const { data, isLoading } = useGetUserByIdQuery(id)
  const detailUser = data?.data
  console.log('data', data)

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
        {true
          ? <ActivityIndicator
              size='large'
              animating
              style={{
                marginTop: 128,
              }}
            />
          : <View
            style={{
              alignItems: 'center'
            }}
          >
            <Spacer height={24} />
            <Avatar.Image
              size={192}
              source={{ uri: `${BASE_URL}${detailUser?.image}` }}
            />
            <Spacer height={24} />
            <View>
              <Text variant="bodyLarge">NRP: {detailUser?.nrp}</Text>
              <Text variant="bodyLarge">Nama: {detailUser?.name}</Text>
              <Text variant="bodyLarge">Rank: {detailUser?.rank}</Text>
              <Text variant="bodyLarge">Status: {detailUser?.status}</Text>
              <Text variant="bodyLarge">Alamat: {detailUser?.address}</Text>
            </View>
          </View>}
      </ScrollView>
    </View>
  )
}

export default DetailScreen