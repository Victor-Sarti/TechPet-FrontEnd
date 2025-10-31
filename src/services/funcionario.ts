import api from './api'

export type Funcionario = { id?: number } & Record<string, any>

const base = '/funcionario'

export async function listFuncionarios() {
  const { data } = await api.get<Funcionario[]>(base)
  return data
}

export async function getFuncionario(id: number) {
  const { data } = await api.get<Funcionario>(`${base}/${id}`)
  return data
}

export async function createFuncionario(payload: Omit<Funcionario, 'id'>) {
  const { data } = await api.post<Funcionario>(base, payload)
  return data
}

export async function updateFuncionario(id: number, payload: Partial<Funcionario>) {
  const { data } = await api.put<Funcionario>(`${base}/${id}`, payload)
  return data
}

export async function deleteFuncionario(id: number) {
  await api.delete(`${base}/${id}`)
}
