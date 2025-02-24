import { supabase } from './supabaseClient.js';

async function testConnection() {
  try {
    // Attempt to fetch data from a known table
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .limit(1); // Limit to 1 row for a quick test

    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }

    console.log('Connection successful. Data:', data);
    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

testConnection(); 