'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignInFormSchema } from '@/lib/validators'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { signInUser } from '@/lib/actions/auth.actions'

const SignInPage = () => {
    const form = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
        try {
            const res = await signInUser(values.email, values.password)
            if (res?.error) {
                toast.error(res.error)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.message || "Something went wrong")
        }
    }

    return (
        <main className='p-4 min-h-screen flex justify-center items-center'>
            <section className='max-w-md w-full h-max mx-auto shadow-md dark:shadow-muted/50 p-6 rounded-lg border'>
                <div>
                    <h1 className='text-xl font-bold mb-1 text-center'>Welcome back</h1>
                    <p className='text-sm text-muted-foreground mb-4 text-center'>Sign in to your account to manage contacts</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
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
                                        <Input type="text" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-center items-center pt-2'>
                            <Button
                                disabled={form.formState.isSubmitting}
                                type="submit"
                                className='w-full disabled:opacity-80'
                            >
                                {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
                            </Button>
                        </div>
                        <p className='text-sm text-muted-foreground'>Don't have an account? <Link href="/sign-up" className='text-blue-500 underline'>Sign Up</Link></p>
                    </form>
                </Form>
            </section>
        </main>
    )
}

export default SignInPage
