import { connectToDb } from "./utils";
import { Product, User } from "./models";

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i")
    const mongooseOptions = {
        username: {
            $regex: regex
        }
    }

    try {
        connectToDb()
        const count = await User.find(mongooseOptions).count()
        const users = await User.find(mongooseOptions).limit(2).skip(2 * (page - 1))
        return {
            count,
            users
        }
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch users!")
    }
}

export const fetchUser = async (id) => {
    try {
        connectToDb()
        const user = await User.findById(id)
        return user
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch user!")
    }
}

export const fetchProducts = async (q, page) => {
    const regex = new RegExp(q, "i")
    const mongooseOptions = {
        title: {
            $regex: regex
        }
    }

    try {
        connectToDb()
        const count = await Product.find(mongooseOptions).count()
        const products = await Product.find(mongooseOptions).limit(2).skip(2 * (page - 1))
        return {
            count,
            products
        }
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch products!")
    }
}

export const fetchProduct = async (id) => {
    try {
        connectToDb()
        const product = await Product.findById(id)
        return product
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch product!")
    }
}
