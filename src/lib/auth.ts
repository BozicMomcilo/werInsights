import { supabase, isSupabaseConfigured } from './supabase/supabaseClient'

export const auth = {
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please connect your Supabase project first.')
    }
    
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please connect your Supabase project first.')
    }
    
    const { error } = await supabase!.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    if (!isSupabaseConfigured()) {
      return null
    }
    
    const { data: { session } } = await supabase!.auth.getSession()
    return session
  }
}