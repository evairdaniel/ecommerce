import type { CreateOrderDto } from '../interfaces/order';
import type { Product } from '../interfaces/product';
import type { ProfileDto, UpdateProfileDto } from '../interfaces/profile ';
import type { UpdateUserDto, UserDto } from '../interfaces/user';
import { api } from './axios';

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', data);
    return response;
  } catch (error) {
    console.error('Erro ao fazer login', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/product');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    throw error;
  }

};

export const updateUser = async (data: UpdateUserDto) => {
  try {
    const response = await api.put(`/users/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao alterar usuario', error);
    throw error;
  }
}

export const updateProfile = async (data: UpdateProfileDto) => {
  try {
    const response = await api.put(`/profile/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao alterar perfil', error);
    throw error;
  }
}

export const createOrder = async (data: CreateOrderDto) => {
  try {
    const response = await api.post(`/orders/`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pedido', error);
    throw error;
  }
}

export const fetchOrders = async (userId: string) => {
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos', error);
    throw error;
  }
}

export const createProfile = async (data: ProfileDto) => {
  try {
    const response = await api.post(`/profile/`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar perfil', error);
    throw error;
  }
}

export const createUser = async (data: UserDto) => {
  try {
    const response = await api.post(`/users/`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário', error);
    throw error;
  }
}
export const updateProduct = async (data: Product) => {
  try {
    const response = await api.put(`/product/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao alterar produto', error);
    throw error;
  }
}

export const createProduct = async (data: Product) => {
  try {
    const response = await api.post(`/product`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar produto', error);
    throw error;
  }
}
export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto', error);
    throw error;
  }
}