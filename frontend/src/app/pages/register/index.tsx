"use client"

import UserRegistrationForm from "./componentes/user-registration-form"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Crie sua conta</h1>
                    <p className="text-muted-foreground mt-2">
                        Preencha as informações abaixo para começar a usar nossa plataforma
                    </p>
                </div>
                <UserRegistrationForm />
            </div>
        </div>
    )
}
