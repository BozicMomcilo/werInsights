import { supabase } from './supabaseClient.ts';

// Fetch all rows from a table
export async function fetchAllFromTable(tableName: string) {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(column, value);

  if (error) {
    console.error('Error fetching rows:', error);
    return null;
  }
  return data;
} 