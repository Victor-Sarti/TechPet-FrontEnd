import api from './api'

export type Animal = { id?: number } & Record<string, any>

const base = '/animal'

export async function listAnimais() {
  const { data } = await api.get<Animal[]>(base)
  return data
}

export async function getAnimal(id: number) {
  const { data } = await api.get<Animal>(`${base}/${id}`)
  return data
}

export async function createAnimal(payload: Omit<Animal, 'id'>) {
  const { data } = await api.post<Animal>(base, payload)
  return data
}

export async function updateAnimal(id: number, payload: Partial<Animal>) {
  const { data } = await api.put<Animal>(`${base}/${id}`, payload)
  return data
}

export async function deleteAnimal(id: number) {
  await api.delete(`${base}/${id}`)
}

export async function animalExiste(id: number) {
  try {
    await getAnimal(id)
    return true
  } catch (error) {
    if ((error as any)?.response?.status === 404) {
      return false
    }
    throw error
  }
}
