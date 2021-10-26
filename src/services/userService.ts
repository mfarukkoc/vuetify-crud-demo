import axios from "axios";
import UserType from "@/types/user";

// apiId only valid for few hours, replace it
// with the acquired ID from https://crudcrud.com/
const apiId = "85446a871c3e4424a57362c3976fa3b8";

const userService = () => {
  const api = axios.create({
    baseURL: `https://crudcrud.com/api/${apiId}`,
  });

  return {
    getUsers: async () => {
      try {
        const response = await api.get<UserType[]>("/user");
        return { data: response.data };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return { error: true, message: error.message };
        }
        return { error: true, message: "Unknown error" };
      }
    },
    deleteUser: async (userId: string) => {
      try {
        const response = await api.delete(`/user/${encodeURI(userId)}`);
        return { data: response.data };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return { error: true, message: error.message };
        }
        return { error: true, message: "Unknown error" };
      }
    },
    updateUser: async (updatedUser: UserType) => {
      try {
        const { _id, ...rest } = updatedUser;
        const response = await api.put(`/user/${encodeURI(_id)}`, rest);
        return { data: response.data };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return { error: true, message: error.message };
        }
        return { error: true, message: "Unknown error" };
      }
    },
    createUser: async (newUser: UserType) => {
      try {
        const { _id, ...rest } = newUser;
        const response = await api.post("/user", rest);
        return { data: response.data };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return { error: true, message: error.message };
        }
        return { error: true, message: "Unknown error" };
      }
    },
  };
};

export default userService();
