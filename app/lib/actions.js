"use server"

import { revalidatePath } from "next/cache"
import { Product, User } from "./models"
import { connectToDb } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { signIn } from "../auth"

export const addUser = async (formData) => {
    const {
        username,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPass,
            phone,
            address,
            isAdmin,
            isActive
        })

        await newUser.save()
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const updateUser = async (formData) => {
    const {
        id,
        username,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        const updateFields = {
            username,
            email,
            password,
            phone,
            address,
            isAdmin,
            isActive
        }

        Object
            .keys(updateFields)
            .forEach(
                key=>
                    (updateFields[key]===""||undefined) && delete updateFields[key]
            )

        await User.findByIdAndUpdate(id, updateFields)
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const addProduct = async (formData) => {
    const {
        title,
        desc,
        price,
        stock,
        color,
        size
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        const newProduct = new Product({
            title,
            desc,
            price,
            stock,
            color,
            size
        })

        await newProduct.save()
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}

export const updateProduct = async (formData) => {
    const {
        id,
        title,
        desc,
        price,
        stock,
        color,
        size,
        cat
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        const updateFields = {
            title,
            desc,
            price,
            stock,
            color,
            size,
            cat
        }

        Object
            .keys(updateFields)
            .forEach(
                key=>
                    (updateFields[key]===""||undefined) && delete updateFields[key]
            )

        await Product.findByIdAndUpdate(id, updateFields)
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}

export const deleteProduct = async (formData) => {
    const {
        id
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        await Product.findByIdAndDelete(id)
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/products")
}

export const deleteUser = async (formData) => {
    const {
        id
    } = Object.fromEntries(formData)

    try {
        connectToDb()

        await User.findByIdAndDelete(id)
    } catch (e) {
        throw new Error(e)
    }

    revalidatePath("/dashboard/users")
}

export const authenticate = async (prevState, formData) => {
    const {
        username,
        password
    } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password })
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
}
