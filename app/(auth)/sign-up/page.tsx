'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpFormSchema } from '@/lib/validators'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { createUser } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        try {
            const res = await createUser(values)
            if (res?.error) {
                toast.error(res?.error)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.message || "Something went wrong")
        }
    }

    return (
        <main className='p-4 min-h-screen flex justify-center items-center border-4'>
            <section className='max-w-md w-full h-max mx-auto shadow-md dark:shadow-muted/50 p-6 rounded-lg border'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Create a new account</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-center items-center pt-2'>
                            <Button
                                type="submit"
                                className='w-full disabled:opacity-80'
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
                            </Button>
                        </div>
                        <p className='text-sm text-muted-foreground'>Already have an account? <Link href="/sign-in" className='text-blue-500 underline'>Sign In</Link></p>
                    </form>
                </Form>
            </section>
        </main>
    )
}

export default SignUpPage