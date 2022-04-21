import axios  from "axios";
import { User } from "../types";

const API = axios.create({baseURL: "http://localhost:7090"})

export const newUser = (user: User) => API.post("/auth/signup", user)

export const logIn = (email: string, password: string) => API.post("/auth/login", {email,password})

export const getUser = (token: string) => API.get("/auth/me", {headers: {authorization: token}})

export const sendMessage = (message: string, userId: number, conversationId: string) => API.post(`/chat/send/${userId}/${conversationId}`, {message})

export const getChat = (conversationId: string) => API.get(`/chat/${conversationId}`)

export const getChats = (userId: string) => API.get(`/chat/user/${userId}`)