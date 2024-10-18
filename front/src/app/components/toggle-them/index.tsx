/* eslint-disable react-hooks/rules-of-hooks */
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useTheme } from "../../../theme-provider"

export const ToggleTheme = () => {
     const { theme, toggleTheme } = useTheme()
     return (
          <span
               className="lg:flex text-3xl cursor-pointer"
               onClick={() => toggleTheme()}
          >
               {theme === `light` ? <FaRegMoon /> : <LuSunMedium />}
          </span>
     )
}
