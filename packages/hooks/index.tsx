import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { hono_client } from './hono_client'
import { RegisterFields } from '@repo/zod-types'
// import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

export function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export function useRegister() {
  return useMutation({
    onError: (error) => {
      console.log(error.message)
    },
    onSuccess: (data) => {
      console.log(data)
    },

    mutationFn: (data: RegisterFields) => {
      return hono_client.api.auth.register.$post({
        form: {
          email: data.email,
          password: data.password,
          name: data.name,
          phone: data.phone,
          agreeTerms: data.agreeTerms.toString(),
        }
      })
    },
  },
  )
}
