import api from "../api";
import {User} from "../types/AuthResponse.ts";
import {AxiosResponse} from "axios";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return api.get<User[]>('/users')
    }
}