import api from './api'

export type Cliente = { id?: number } & Record<string, any>

const base = '/clientes'

export async function listClientes() {
  const { data } = await api.get<Cliente[]>(base)
  return data
}

export async function getCliente(id: number) {
  const { data } = await api.get<Cliente>(`${base}/${id}`)
  return data
}

export async function createCliente(payload: Omit<Cliente, 'id'>) {
  const { data } = await api.post<Cliente>(base, payload)
  return data
}

export async function updateCliente(id: number, payload: Partial<Cliente>) {
  const { data } = await api.put<Cliente>(`${base}/${id}`, payload)
  return data
}

export async function deleteCliente(id: number) {
  await api.delete(`${base}/${id}`)
}

export async function loginCliente(email: string, senha: string) {
  const { data } = await api.post<{ token: string; cliente: Cliente }>(`${base}/login`, { email, senha })
  return data
}
