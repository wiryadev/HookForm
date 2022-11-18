import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Appbar, Button, HelperText, TextInput, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import DropdownMenu from '../../components/DropdownMenu'
import Spacer from '../../components/Spacer'
import TextField from '../../components/TextField'
import { useGetRanksQuery } from '../../services/rankApi'
import { useGetStatusesQuery } from '../../services/statusApi'
import { usePostUserMutation } from '../../services/userApi'
import validationSchema from './validationSchema'


const FormScreen = ({ navigation }) => {

  const theme = useTheme()

  const initialValues = {
    nrp: '',
    name: '',
    born_place: '',
    born_date: null,
    address: '',
    rank_id: '',
    status_id: ''
  }

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  const { formState, control, register, setValue, handleSubmit } = form

  const bornDateHook = useWatch({
    control: control,
    name: 'born_date',
  })

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)
  const [rank, setRank] = useState('')
  const [status, setStatus] = useState('')

  const [postUser] = usePostUserMutation()

  const data = useGetRanksQuery().data
  console.log('getRanks', data)

  useGetStatusesQuery()

  const ranks = useSelector((state) => state.rank.ranks)
  console.log('ranks', ranks)

  const ranksDropDown = ranks.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  const statuses = useSelector((state) => state.status.statuses)
  console.log('statuses', statuses)
  const statusesDropDown = statuses.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  const handleBornDateSave = () => {
    setValue('born_date', date, { shouldValidate: true })
    setShowDate(false)
  }

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

  useEffect(() => {
    register('born_date')
  }, [register])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Add Personel"
        />
      </Appbar.Header>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          <TextField
            name="nrp"
            label="Nomor Personil"
            mode="outlined"
            keyboardType="number-pad"
            control={control}
          />
          <Spacer height={16} />
          <TextField
            name="name"
            label="Nama Personil"
            mode="outlined"
            control={control}
          />
          <Spacer height={16} />
          <TextField
            name="born_place"
            label="Tempat Lahir"
            mode="outlined"
            control={control}
          />
          <Spacer height={16} />
          <View>
            <TouchableOpacity onPress={() => setShowDate(true)}>
              <TextInput
                pointerEvents="box-none"
                label="Tanggal Lahir"
                mode="outlined"
                value={
                  bornDateHook ? dayjs(bornDateHook).format('DD MMMM YYYY') : ''
                }
              />
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                is24Hour
                mode="date"
                positiveButton={{
                  label: 'OK',
                  textColor: 'green'
                }}
                negativeButton={{
                  label: 'Cancel',
                  textColor: 'red',
                }}
                display="default"
                onChange={(_, date) => {
                  console.log('DateTimePicker', date)
                  setShowDate(false)
                  setDate(date)
                  handleBornDateSave()
                }}
              />
            )}
            <ErrorMessage
              errors={formState.errors}
              name="born_date"
              render={({ message }) => (
                <HelperText
                  type="error"
                  visible={!!message}
                  style={{ fontSize: 12 }}
                >
                  {message}
                </HelperText>
              )}
            />
          </View>
          <Spacer height={16} />
          <TextField
            multiline
            name="address"
            label="Alamat"
            mode="outlined"
            control={control}
          />
          <Spacer height={16} />
          <DropdownMenu
            label="Rank"
            name="rank_id"
            control={control}
            list={ranksDropDown}
            mode="outlined"
            dropdownStyle={{
              marginBottom: 16
            }}
          />
          <Spacer height={16} />
          <DropdownMenu
            label="Status"
            name="status_id"
            list={statusesDropDown}
            control={control}
            mode="outlined"
            dropdownStyle={{
              marginBottom: 16
            }}
          />
          <Spacer height={36} />
          <Button
            onPress={handleSubmit(onSubmit)}
            mode='contained-tonal'
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default FormScreen