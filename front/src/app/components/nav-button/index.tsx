import { Link } from "react-router-dom"
import { Button } from "../button"

type Props = {
     children: React.ReactNode
     icon: JSX.Element
     href: string
     classProps?: string
}
export const NavButton = ({ children, icon, href, classProps }: Props) => {
     return (
          <Button className={`flex justify-start text-xl ${classProps || ''}`} icon={icon}>
               <Link to={href}>{children}</Link>
          </Button>
     )
}