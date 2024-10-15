export const useDate = () => {

     const validDate = (date) => {
          const initial = new Date(date)

          const dd = `${initial.getDate()}`.padStart(2, '0')
          const mm = `${initial.getMonth() + 1}`.padStart(2, '0')
          const yyyy = `${initial.getFullYear()}`.padStart(2, '0')

          return { defaultDate: `${dd}.${mm}.${yyyy}`, calendar: `${yyyy}-${mm}-${dd}` }
     }

     return { validDate }
}