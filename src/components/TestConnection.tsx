import { useState, useEffect } from 'react'
import { supabaseApi } from '../lib/supabase'

export const TestConnection = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Try to fetch data from a table (replace 'your_table' with an actual table name)
      const result = await supabaseApi.getAll('your_table')
      setData(result)
      setStatus('success')
    } catch (err) {
      setError(err.message)
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