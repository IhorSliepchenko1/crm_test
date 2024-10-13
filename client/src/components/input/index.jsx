import { Input } from "@nextui-org/react"
import { useController } from "react-hook-form"


export const CustomInput = ({
     name,
     label,
     placeholder,
     type,
     control,
     required = ``,
}) => {
     const {
          field,
          fieldState: { invalid },
          formState: { errors },
     } = useController({
          name,
          control,
          rules: {
               required,
          },
     })
     return (
          <Input
               id={name}
               label={label}
               type={type}
               placeholder={placeholder}
               value={field.value}
               name={field.name}
               isInvalid={invalid}
               onChange={field.onChange}
               onBlur={field.onBlur}
               errorMessage={`${errors[name]?.message ?? ``}`}
          />
     )
}