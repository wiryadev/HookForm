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
import validationSchema from './validationSchema'


const FormDetail = ({ 
  initialValues = {},
  ranks = [],
  statuses = [],
  isLoading,
  onSubmit,
 }) => {

  const theme = useTheme()

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

  const handleBornDateSave = () => {
    setValue('born_date', date, { shouldValidate: true })
    setShowDate(false)
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
                editable={false}
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
            list={ranks}
            mode="outlined"
            dropdownStyle={{
              marginBottom: 16
            }}
          />
          <Spacer height={16} />
          <DropdownMenu
            label="Status"
            name="status_id"
            list={statuses}
            control={control}
            mode="outlined"
            dropdownStyle={{
              marginBottom: 16
            }}
          />
          <Spacer height={36} />
          {isLoading
            ? <ActivityIndicator animating />
            : <Button
              onPress={handleSubmit(onSubmit)}
              mode='contained-tonal'
            >
              Submit
            </Button>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default FormDetail