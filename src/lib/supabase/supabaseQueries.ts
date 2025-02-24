import { supabase, isSupabaseConfigured } from './supabaseClient';

// Fetch all rows from a table
export async function fetchAllFromTable(tableName: string) {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured');
    return null;
  }

  const { data, error } = await supabase!
    .from(tableName)
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return null;
  }
  return data;
}

// Fetch a single row by ID
export async function fetchRowById(tableName: string, id: string) {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured');
    return null;
  }

  const { data, error } = await supabase!
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching row:', error);
    return null;
  }
  return data;
}

// Fetch rows with a specific condition
export async function fetchRowsWithCondition(tableName: string, column: string, value: string) {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured');
    return null;
  }

  const { data, error } = await supabase!
    .from(tableName)
    .select('*')
    .eq(column, value);

  if (error) {
    console.error('Error fetching rows:', error);
    return null;
  }
  return data;
}