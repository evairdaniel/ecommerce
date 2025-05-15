import AuthProvider from "./app/provider/authProvider"
import { CartProvider } from "./app/provider/cartProvider"
import Routes from "./app/routes"

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  )
}