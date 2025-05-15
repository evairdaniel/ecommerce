"use client"

import { useAuth } from "@/app/provider/authProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogOut, PackagePlus, ShoppingBag, ShoppingCart, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="p-4 flex items-center gap-4">
      {token ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cart")}
            title="Ver carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>

          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer border border-blue-600">
                <AvatarImage
                  src={user?.profile?.avatar || "/avatar.png"}
                  alt="avatar"
                />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3 space-y-2">
              {user?.name && (
                <p className="text-sm text-gray-600 border-b pb-2">{user.name}</p>
              )}
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => navigate("/profile")}
              >
                <UserCog className="w-4 h-4" />
                Alterar perfil
              </Button>
              {user?.profile?.role == 1 && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/products")}
                >
                  <PackagePlus className="h-4 w-4" />
                  Cadastro de Produto
                </Button>
              )}

              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => navigate("/orders")}
              >
                <ShoppingBag className="w-4 h-4" />
                Meus pedidos
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Button variant="outline" onClick={handleLogin}>
          Entrar
        </Button>
      )}
    </div>
  );
}
