import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, HelperText, TextInput, useTheme } from 'react-native-paper'
import DropdownMenu from '../../components/DropdownMenu'
import Spacer from '../../components/Spacer'
import TextField from '../../components/TextField'
import validationSchema from './validationSchema'
import * as ImagePicker from "expo-image-picker";


const FormDetail = ({
  initialValues = {},
  ranks = [],
  statuses = [],
  isLoading,
  onSubmit,
  onBackPress,
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

  const imageHook = useWatch({
    control,
    name: "image",
  })

  const [date, setDate] = useState(new Date())
  const [showDate, setShowDate] = useState(false)

  const handleBornDateSave = () => {
    setValue('born_date', date, { shouldValidate: true })
    setShowDate(false)
  }

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 0.5,
      })
      console.log('result', result)
      if (!result.canceled) {
        setValue("image", result.assets[0], { shouldValidate: true });
      }
    } catch (e) {
      console.log("err", e);
    }
  }

  useEffect(() => {
    register('born_date')
    register("image")
  }, [register])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction
          onPress={onBackPress}
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
          <Spacer height={16} />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              alt="img-content"
              borderRadius={8}
              source={{ uri: imageHook?.uri }}
              resizeMode="cover"
            />
            <ErrorMessage
              errors={formState.errors}
              name="image"
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
            <Button onPress={pickImage}>
              Pick Image
            </Button>
          </View>
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