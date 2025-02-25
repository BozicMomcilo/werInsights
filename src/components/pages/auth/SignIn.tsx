import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../lib/auth/auth'
import { Logo } from '../../shared/Logo'
import { Mail, Lock, Loader } from 'lucide-react'
import { isSupabaseConfigured } from '../../../lib/supabase/supabaseClient'

export const SignIn = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isSupabaseConfigured()) {
      setError('Please connect your Supabase project first')
      return
    }
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await auth.signIn(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A101A] p-4">
      <div className="glass-panel p-8 w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
          <p className="text-[#B0B3BA] text-sm">Sign in to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="glass-panel flex items-center px-4 py-2">
                <Mail className="w-5 h-5 text-[#72A0D6] mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent w-full border-none focus:outline-none text-white placeholder-[#B0B3BA]"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="glass-panel flex items-center px-4 py-2">
                <Lock className="w-5 h-5 text-[#72A0D6] mr-3" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-transparent w-full border-none focus:outline-none text-white placeholder-[#B0B3BA]"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="text-[#FF3B3B] text-sm text-center bg-[#FF3B3B]/10 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full glass-panel px-6 py-3 text-white font-medium
              transition-all duration-300 button-hover flex items-center justify-center
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}