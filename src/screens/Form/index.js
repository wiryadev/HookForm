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
import TextField from '../../components/TextField'
import { useGetRanksQuery } from '../../services/rankApi'
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

  const [postUser] = usePostUserMutation()

  const genderList = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    },
  ]

  const data = useGetRanksQuery().data
  console.log('getRanks', data)
  // useEffect(() => {
    
  // }, [])
  
  const ranks = useSelector((state) => state.rank.ranks)
  console.log('ranks', ranks)

  const ranksDropDown = ranks.map((item) => {
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
    postUser(payload)
    console.log('payload', payload)
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
          <TextField
            name="name"
            label="Nama Personil"
            mode="outlined"
            control={control}
          />
          <TextField
            name="born_place"
            label="Tempat Lahir"
            mode="outlined"
            control={control}
          />

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

          <TextField
            multiline
            name="address"
            label="Alamat"
            mode="outlined"
            control={control}
          />
          <DropdownMenu
            label="Status"
            list={ranksDropDown}
            value={rank}
            setValue={setRank}
            mode="outlined"
            dropdownStyle={{
              marginBottom: 16
            }}
          />
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