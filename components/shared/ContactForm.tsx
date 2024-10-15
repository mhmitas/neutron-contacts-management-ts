"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { contactFormSchema } from '@/lib/validators'
import { contactFormDefaultValue } from '@/lib/constants'
import { Plus, User } from 'lucide-react'
import { CgSpinner } from "react-icons/cg";
import Image from 'next/image'
import { createContact, updateContact } from '@/lib/actions/contact.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { IContact } from '@/lib/database/models/contact.model'
import { z } from 'zod'

type ContactFormProps = {
    formType: "Create" | "Update",
    contact?: IContact,
    userId: string,
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContactForm = ({ formType, contact, userId, setShowModal }: ContactFormProps) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState(
        formType === "Update" && contact ? contact?.avatar : ""
    )
    const router = useRouter()

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return
        if (e.target.files?.[0]?.size > (1 * 1000000)) {
            return toast.error("Profile picture size maximum 1 MB accepted")
        }
        setAvatarFile(e.target?.files?.[0])
        setAvatarPreview(URL.createObjectURL(e.target.files[0]))
    }

    const initialValues = formType === "Update" && contact ? { ...contact } : contactFormDefaultValue

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: initialValues,
    })

    async function onSubmit(values: z.infer<typeof contactFormSchema>) {
        if (!userId) return;
        // create a new contact
        if (formType === "Create") {
            try {
                const formData = new FormData()
                if (avatarFile) formData.append("avatarFile", avatarFile);

                const res = await createContact({
                    contact: values,
                    formData,
                    userId
                })
                // console.log(res)
                // if any errors are returned display them
                if (res?.error) {
                    return toast.error(res.error)
                }
                // navigate to the home page
                if (res?.success) {
                    form?.reset()
                    router.push(`/contacts/${res?.data?._id}/details`)
                }
            } catch (error: any) {
                console.log(error)
                toast.error(error?.message || "Something went wrong")
            }
        }
        // update contact
        if (formType === "Update") {
            try {
                const formData = new FormData();
                if (avatarFile) {
                    formData.append("avatarFile", avatarFile)
                }
                const res = await updateContact({
                    contactId: contact?._id as string,
                    contact: values,
                    formData,
                    userId
                })
                if (res?.error) {
                    return toast.error(res.error)
                }
                // navigate to the home page
                if (res?.success) {
                    router.push(`/contacts/${contact?._id}/details`)
                    if (setShowModal) {
                        setShowModal(false)
                    }
                }
            } catch (error: any) {
                console.log(error)
                toast.error(error?.message || "Something went wrong")
            }
        }
    }

    return (
        <section className='w-full mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* avatar input */}
                    <label
                        htmlFor='avatar'
                        className='m-auto relative border bg-gradient-to-b from-cyan-500/20 to-violet-500/20 w-max rounded-full flex size-28 sm:size-36 aspect-square cursor-pointer'
                        title='Click to add profile photo'
                    >
                        <figure className='size-full overflow-hidden rounded-full flex items-center'>
                            {avatarPreview ? <Image className='w-full' width={150} height={150} src={avatarPreview} alt="avatar-preview" /> :
                                <User strokeWidth={1} className='p-6 size-full' />
                            }
                        </figure>
                        <input onChange={handleAvatarChange} type="file" name="avatar" id="avatar" className='hidden' accept="image/*" />
                        <span className="absolute bottom-0 right-0 z-10 rounded-full border-background border-4 bg-primary text-primary-foreground p-1 hover:bg-opacity-90"><Plus /></span>
                    </label>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='text-center pt-2'>
                        <Button
                            variant="secondary"
                            type="submit"
                            disabled={form?.formState?.isSubmitting}
                            className="disabled:opacity-95"
                        >
                            {form?.formState?.isSubmitting ?
                                <>
                                    <CgSpinner className='mr-1 text-2xl animate-spin duration-500' />
                                    <span>Saving</span>
                                </> :
                                <span>Save</span>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default ContactForm