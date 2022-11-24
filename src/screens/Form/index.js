import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, HelperText, TextInput, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import DropdownMenu from '../../components/DropdownMenu'
import Spacer from '../../components/Spacer'
import TextField from '../../components/TextField'
import { useGetRanksQuery } from '../../services/rankApi'
import { useGetStatusesQuery } from '../../services/statusApi'
import { usePostUserMutation } from '../../services/userApi'
import FormDetail from './detail'
import validationSchema from './validationSchema'


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
      born_date: dayjs(values.born_date).format('DD MMMM YYYY')
    }
    console.log('payload', payload)
    postUser(payload)
      .unwrap()
      .then((_) => navigation.goBack())
      .catch((err) => {
        console.log('error', err)
        Alert.alert('Error', err.data.error)
      })
  }

  return (
    <FormDetail
      initialValues={initialValues}
      ranks={ranks}
      statuses={statuses}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  )
}

export default FormScreen