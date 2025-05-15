

import { login } from "@/app/api/apiService"
import type { LoginFormData } from "@/app/interfaces/auth"
import { useAuth } from "@/app/provider/authProvider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const navigate = useNavigate()
  const { setToken } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data)

      const { access_token, user } = response.data

      setToken(access_token)
      localStorage.setItem("user", JSON.stringify(user))

      toast.success("Login realizado com sucesso!")


      navigate("/home")

    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Erro ao fazer login"
      toast.error(message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                      message: "Email inválido"
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  )}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Senha é obrigatória" }}
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  )}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
              <Link to='/register' className="p-0.5"><CardDescription>
                Registrar
              </CardDescription> </Link>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
