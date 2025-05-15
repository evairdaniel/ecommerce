import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, ChevronLeft, ChevronRight, Eye, EyeOff, Loader2, Upload, UserCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { updateProfile, updateUser } from "@/app/api/apiService"
import type { UpdateProfileDto } from "@/app/interfaces/profile "
import type { UpdateUserDto } from "@/app/interfaces/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn, toBase64 } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Header from "../home/components/Header"

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 8,
      { message: "Senha deve ter pelo menos 6 caracteres" }
    )
    .refine(
      (val) => !val || /[A-Z]/.test(val),
      { message: "Senha deve conter pelo menos uma letra maiúscula" }
    )
    .refine(
      (val) => !val || /[a-z]/.test(val),
      { message: "Senha deve conter pelo menos uma letra minúscula" }
    )
    .refine(
      (val) => !val || /[0-9]/.test(val),
      { message: "Senha deve conter pelo menos um número" }
    ),
  bio: z.string().max(500, { message: "Bio deve ter no máximo 500 caracteres" }).optional(),
  avatar: z.any().optional(),
  role: z.string().min(1, { message: "Selecione um perfil" }),

})

type FormValues = z.infer<typeof formSchema>

export default function ProfilePage() {

  const [activeStep, setActiveStep] = useState<string>("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      bio: user.profile.bio,
      role: String(user.profile.role),
      avatar: user.profile.avatar
    },
    mode: "onChange",
  })

  const watchPassword = form.watch("password")

  useEffect(() => {
    if (user.profile.avatar) {
      setAvatarPreview(user.profile.avatar)
    }
  }, [user.profile.avatar])

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0

    let strength = 0


    if (password.length >= 6) strength += 25

    if (/[A-Z]/.test(password)) strength += 25

    if (/[a-z]/.test(password)) strength += 25

    if (/[0-9]/.test(password)) strength += 25

    return strength
  }


  useState(() => {
    if (watchPassword) {
      setPasswordStrength(calculatePasswordStrength(watchPassword))
    }
  })

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)

      const profilePayload: UpdateProfileDto = {
        id: user.profile.profileId,
        avatar: values.avatar,
        bio: values.bio,
        role: Number(values.role)
      };

      const response = await updateProfile(profilePayload);

      const userPayload: UpdateUserDto = {
        id: user.id,
        name: values.name,
        email: values.email,
        password: values.password,
        profileId: response.id
      }

      await updateUser(userPayload);

      setTimeout(() => {
        setIsSubmitting(false)

        toast.success("Usuário alterado com sucesso!")
        form.reset()
        setAvatarPreview(null)
        setActiveStep("personal")
        navigate('/login');
      }, 1500)
    } catch (error) {
      toast.error("Erro ao alterar usuário.");
      setIsSubmitting(false)
      console.error("Erro ao alterar usuário.", error)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const MAX_SIZE = 1 * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        toast.error("Imagem muito grande. Máximo permitido: 1MB.");
        return;
      }
      try {
        const base64 = await toBase64(file)
        setAvatarPreview(base64 as string)
        form.setValue("avatar", base64)
      } catch (err) {
        console.error("Erro ao converter imagem para base64", err)
      }
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Fraca"
    if (passwordStrength <= 50) return "Média"
    if (passwordStrength <= 75) return "Boa"
    return "Forte"
  }

  const nextStep = () => {
    if (activeStep === "personal") {

      form.trigger(["name", "email"])
      const nameError = form.formState.errors.name
      const emailError = form.formState.errors.email

      if (
        !nameError &&
        !emailError &&
        form.getValues("name") &&
        form.getValues("email")
      ) {
        setActiveStep("profile")
      }
    } else if (activeStep === "profile") {
      setActiveStep("confirmation")
    }
  }

  const prevStep = () => {
    if (activeStep === "profile") {
      setActiveStep("personal")
    } else if (activeStep === "confirmation") {
      setActiveStep("profile")
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Meu dados cadastrais</h1>
          </div>
          <Card className="shadow-lg border-slate-200">
            <CardContent className="p-6">
              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger
                    value="personal"
                    onClick={() => setActiveStep("personal")}
                    disabled={isSubmitting}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Dados Pessoais
                  </TabsTrigger>
                  <TabsTrigger
                    value="profile"
                    onClick={() => setActiveStep("profile")}
                    disabled={isSubmitting}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger
                    value="confirmation"
                    onClick={() => setActiveStep("confirmation")}
                    disabled={isSubmitting}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Confirmação
                  </TabsTrigger>
                </TabsList>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <TabsContent value="personal" className="space-y-6 mt-0">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu nome completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input disabled placeholder="seu.email@exemplo.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="Digite sua senha"
                                    type={showPassword ? "text" : "password"}
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e)
                                      setPasswordStrength(calculatePasswordStrength(e.target.value))
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              {watchPassword && (
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span>Força da senha:</span>
                                    <span
                                      className={cn(
                                        passwordStrength <= 25
                                          ? "text-red-500"
                                          : passwordStrength <= 50
                                            ? "text-orange-500"
                                            : passwordStrength <= 75
                                              ? "text-yellow-500"
                                              : "text-green-500",
                                      )}
                                    >
                                      {getPasswordStrengthText()}
                                    </span>
                                  </div>
                                  <Progress
                                    value={passwordStrength}
                                    className="h-1" />
                                </div>
                              )}
                              <FormDescription>
                                Mínimo 6 caracteres, incluindo maiúsculas, minúsculas e números
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextStep}>
                          Próximo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6 mt-0">
                      <div className="flex flex-col items-center mb-6">
                        <FormField
                          control={form.control}
                          name="avatar"
                          render={() => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-center block">Avatar</FormLabel>
                              <FormControl>
                                <div className="flex flex-col items-center gap-4">
                                  <Avatar className="w-32 h-32 border-2 border-primary/20">
                                    <AvatarImage src={avatarPreview || ""} />
                                    <AvatarFallback className="text-2xl bg-primary/10">
                                      {form.watch("name") ? (
                                        getInitials(form.watch("name"))
                                      ) : (
                                        <UserCircle className="h-12 w-12 text-muted-foreground" />
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="relative">
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      id="avatar-upload"
                                      onChange={handleAvatarChange}
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => document.getElementById("avatar-upload")?.click()}
                                      className="gap-2"
                                    >
                                      <Upload className="h-4 w-4" />
                                      {avatarPreview ? "Alterar imagem" : "Carregar imagem"}
                                    </Button>
                                  </div>
                                </div>
                              </FormControl>
                              <FormDescription className="text-center">Escolha uma imagem para seu perfil</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Conte um pouco sobre você..."
                                className="resize-none min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Máximo de 500 caracteres
                              <span className="float-right">{field.value?.length || 0}/500</span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Perfil</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <RadioGroupItem value="0" />
                                  </FormControl>
                                  <div className="space-y-1">
                                    <FormLabel className="font-medium">Comprador</FormLabel>
                                    <FormDescription>Explore ofertas e acompanhe suas compras</FormDescription>
                                  </div>
                                </FormItem>
                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <RadioGroupItem value="1" />
                                  </FormControl>
                                  <div className="space-y-1">
                                    <FormLabel className="font-medium">Vendedor</FormLabel>
                                    <FormDescription>Gerencie seus produtos e acompanhe seus pedidos</FormDescription>
                                  </div>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Anterior
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          Próximo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="confirmation" className="space-y-6 mt-0">
                      <div className="space-y-6">
                        <div className="bg-muted rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                              <p className="mt-1">{form.getValues("name") || "-"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                              <p className="mt-1">{form.getValues("email") || "-"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Perfil</h3>
                              <p className="mt-1 capitalize">{form.getValues("role") == "0" ? "Comprador" : "Vendedor"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                              <p className="mt-1 line-clamp-2">{form.getValues("bio") || "-"}</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Anterior
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn("min-w-[120px]", isSubmitting && "opacity-80")}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enviando
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Finalizar
                            </>
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
