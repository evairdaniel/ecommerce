import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../interfaces/product";
import { toast } from "sonner";

export interface CartContextValues {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProductQuantity: (id: string, quantity: number) => void;
}

export interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext({} as CartContextValues);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [products, setProducts] = useState<Product[]>(() => {
        const cartProducts = localStorage.getItem("cartProducts");
        return cartProducts == null ? [] : JSON.parse(cartProducts);
    });

    const refreshLocalStorage = (newProductsList: Product[]) => {
        localStorage.setItem("cartProducts", JSON.stringify(newProductsList));
    };

    const addProduct = (product: Product) => {
        let newProductsList;
        const exists = products.filter(prd => product.id === prd.id);

        if (exists.length) {
            newProductsList = products.map(prd => prd.id === product.id ? {
                ...prd,
                quantity: prd.quantity + 1
            } : prd);
        } else {
            newProductsList = [...products, { ...product, quantity: 1 }]
        }

        setProducts(newProductsList);
        refreshLocalStorage(newProductsList);
        toast.success("Item adicionado com sucesso ao carrinho.");
    };

    const removeProduct = (id: string) => {
        const newProductsList = products.filter(product => product.id != id);
        setProducts(newProductsList);
        refreshLocalStorage(newProductsList);
        toast.success("Item removido com sucesso ao carrinho.");
    };

    const updateProductQuantity = (id: string, quantity: number) => {
        const newProductsList = products.map(product => product.id === id ? {
            ...product,
            quantity
        } : product);
        setProducts(newProductsList);
        refreshLocalStorage(newProductsList);
    };

    return (
        <CartContext.Provider value={{ products, addProduct, removeProduct, updateProductQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);