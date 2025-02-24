import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Try to fetch data from a table (replace 'your_table' with an actual table name)
      const result = await supabase.from('person').select('*')
      setData(result.data)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setStatus('error')
    }
  }

  if (status === 'loading') return <div>Testing connection...</div>
  
  if (status === 'error') {
    return (
      <div className="text-[#FF3B3B]">
        Connection failed: {error}
      </div>
    )
  }

  return (
    <div className="text-[#28E0B9]">
      Connection successful! Found {data?.length || 0} records.
    </div>
  )
}