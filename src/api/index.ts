import axios  from "axios";
import { User } from "../types";

const API = axios.create({baseURL: "http://localhost:7090"})

export const newUser = (user: User) => API.post("/auth/signup", user)

export const logIn = (email: string, password: string) => API.post("/auth/login", {email,password})

export const getUser = (token: string) => API.get("/auth/me", {headers: {authorization: token}})