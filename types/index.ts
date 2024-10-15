import { contactFormSchema } from "@/lib/validators"
import { z } from "zod"

export type SignUpParams = {
    name: string
    email: string
    password: string
}

export type CreateContactParams = {
    userId: string,
    contact: z.infer<typeof contactFormSchema>,
    formData: FormData,
}

export type updateContactParams = {
    userId: string,
    contact: z.infer<typeof contactFormSchema>,
    formData: FormData,
    contactId: string,
}

export type toggleFavoriteParams = {
    contactId: string,
    favorite: boolean,
    path: string
}