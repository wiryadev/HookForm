import dayjs from 'dayjs'
import React from 'react'
import { Alert } from 'react-native'
import { useGetRanksQuery } from '../../services/rankApi'
import { useGetStatusesQuery } from '../../services/statusApi'
import { usePostUserMutation } from '../../services/userApi'
import FormDetail from './detail'


const FormScreen = ({ navigation }) => {

  const initialValues = {
    nrp: '',
    name: '',
    born_place: '',
    born_date: null,
    address: '',
    rank_id: '',
    status_id: '',
    image: null,
  }

  const [postUser, { isLoading }] = usePostUserMutation()

  const ranks = useGetRanksQuery().data?.data
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })

  const statuses = useGetStatusesQuery().data?.data
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })

  const onSubmit = (values) => {
    const payload = {
      ...values,
      image: {
        name: `${new Date().getTime()}.png`,
        type: `image/jpeg`,
        uri: values.image.uri,
      },
      born_date: dayjs(values.born_date).format('DD MMMM YYYY'),
    }
    console.log('payload', payload)
    postUser(payload)
      .unwrap()
      .then((_) => navigation.goBack())
      .catch((err) => {
        console.log('error', err)
        Alert.alert('Error', err.error)
      })
  }

  return (
    <FormDetail
      initialValues={initialValues}
      ranks={ranks}
      statuses={statuses}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onBackPress={() => navigation.goBack()}
    />
  )
}

export default FormScreen