import { supabase } from '../components/supabase/supabaseClient'

// Example CRUD operations
export const supabaseApi = {
  // Create
  async create<T>(table: string, data: T) {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  // Read
  async getAll(table: string) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    
    if (error) throw error
    return data
  },

  async getById(table: string, id: string) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Update
  async update<T>(table: string, id: string, data: Partial<T>) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return result[0]
  },

  // Delete
  async delete(table: string, id: string) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}