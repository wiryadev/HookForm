
import { object as yupObject, string as yupString, date as yupDate } from 'yup'

const validationSchema = yupObject().shape({
  nrp: yupString().required('Tidak boleh kosong'),
  name: yupString().required('Tidak boleh kosong'),
  born_place: yupString().required('Tidak boleh kosong'),
  born_date: yupDate().nullable().required('Tidak boleh kosong'),
  address: yupString().required('Tidak boleh kosong'),
  rank_id: yupString().required('Tidak boleh kosong'),
  status_id: yupString().required('Tidak boleh kosong'),
  image: yupObject().nullable().required("Tidak boleh kosong"),
})

export default validationSchema