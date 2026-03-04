'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { resetPassword } from '../login/actions'

export default function ResetPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Recuperar senha
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enviaremos um link para redefinir sua senha
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            Erro ao enviar email. Tente novamente.
          </div>
        )}

        {message === 'reset_email_sent' ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
              Email enviado! Verifique sua caixa de entrada.
            </div>
            <Link
              href="/auth/login"
              className="block text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Voltar para login
            </Link>
          </div>
        ) : (
          <form action={resetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="seu@email.com"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar link
            </button>
            <Link
              href="/auth/login"
              className="block text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Voltar para login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
