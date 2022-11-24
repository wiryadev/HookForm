import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator, Appbar, Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import UserItem from '../../components/UserItem'
import { useGetUsersQuery } from '../../services/userApi'

const HomeScreen = ({ navigation }) => {

  const isFocused = useIsFocused()

  const { data, refetch, isLoading } = useGetUsersQuery({ perPage: 100, page: 1 })

  useEffect(() => {
    if (isFocused) {
      refetch()
      console.log('dataPers', data?.data)
    }
  }, [isFocused])

  const theme = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.primaryContainer
        }}
      >
        <Appbar.Content
          title="Mabes App"
        />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate('FormScreen')}
        />
      </Appbar.Header>
      {isLoading
        ? <ActivityIndicator
          size='large'
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center'
          }}
          animating
        />
        : <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, padding: 32, alignItems: 'center' }}>
              <Text>Data is Empty</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              onPress={() => { 
                navigation.navigate('DetailScreen')
              }}
            />
          )}
        />
      }
    </View>
  )
}

export default HomeScreen