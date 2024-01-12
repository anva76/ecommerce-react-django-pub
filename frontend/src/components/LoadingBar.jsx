import { useGlobalContext } from "../store/context/globalContext"
import { useNavigation } from "react-router-dom"

const LoadingBar = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"
  const {
    productsLoading,
    ordersLoading,
    orderInProgress,
    authInProgress,
    regInProgress,
    categoriesAndBrandsLoading,
  } = useGlobalContext()

  const loading =
    productsLoading ||
    ordersLoading ||
    orderInProgress ||
    authInProgress ||
    regInProgress ||
    categoriesAndBrandsLoading ||
    isLoading

  return <div className={loading ? "loading-bar" : "loading-bar-hidden"}></div>
}

export default LoadingBar
