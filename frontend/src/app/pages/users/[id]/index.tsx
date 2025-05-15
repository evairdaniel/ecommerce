import { fetchUser } from "@/app/api/apiService"
import type { User } from "@/app/interfaces/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    setLoading(true)
    try {
      if (!id) return
      const userr = await fetchUser(id)
      setUser(userr)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <>
      {
        loading ? (
          <div className="space-y-4" >
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : (
          <div className="container py-10">
            <Button variant="outline" className="mb-6">
              <Link to="/users">← Voltar para lista de usuários</Link>
            </Button>

            <Card className="max-w-3xl mx-auto">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user?.profile?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-4xl">{user?.name?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl">{user?.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{user?.profile?.role == 0 ? "Comprador" : "Vendedor"}</p>
                    <p className="text-sm mt-2">{user?.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Sobre</h3>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>

                  <Separator />
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }
    </>
  )
}
