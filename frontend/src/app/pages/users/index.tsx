import { fetchUsers } from "@/app/api/apiService"
import type { User } from "@/app/interfaces/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../home/components/Header"


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const userList = await fetchUsers()
      setUsers(userList)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadUsers()
  }, [])

  return (<>
    <Header />
    <div className="container py-10">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground mt-2">Lista de todos os usuários da plataforma.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.profile?.avatar} alt={user.name} />
                      <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>{user.profile?.role == 0 ? "Comprador" : "Vendedor"}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                  <Button className="w-full">
                    <Link to={`/users/${user.id}`}>Ver perfil</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>

  </>
  )
}
