import {useEffect, useState} from "react";
import {User} from "../types/AuthResponse.ts";
import UserService from "../services/UserService.ts";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = async () => {
        const res = await UserService.fetchUsers();
        setUsers(res.data);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {users.map(user => user.email)}
        </div>
    );
};

export default UsersPage;