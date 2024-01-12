import { Outlet, useNavigation } from "react-router-dom"
import { NavBar, Footer, LoadingBar } from "../components"
import { ErrorPageData } from "../pages"

const Root = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"
  return (
    <>
      <NavBar />
      <LoadingBar />
      {isLoading || <Outlet />}
      <Footer />
    </>
  )
}

export default Root
