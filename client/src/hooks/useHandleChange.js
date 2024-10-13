export const useHandleChange = (data, setData) => {
     const handleChange = (e) => {
          setData({ ...data, [e.target.name]: e.target.value });
     };

     return { handleChange }
}