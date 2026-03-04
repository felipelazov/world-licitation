'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signup } from './actions'

export default function SignupPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Criar conta
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Comece a gerenciar suas licitacoes
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error === 'cnpj_exists' && 'Este CNPJ ja esta cadastrado.'}
            {error === 'tenant_creation_failed' && 'Erro ao criar empresa. Tente novamente.'}
            {error === 'signup_failed' && 'Erro no cadastro. Tente novamente.'}
          </div>
        )}

        <form action={signup} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nome completo
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Seu nome"
            />
          </div>
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Minimo 6 caracteres"
            />
          </div>
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              CNPJ
            </label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div>
            <label htmlFor="razao_social" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Razao Social
            </label>
            <input
              id="razao_social"
              name="razao_social"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Empresa LTDA"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Ja tem conta?{' '}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
