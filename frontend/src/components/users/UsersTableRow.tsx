import { Trash } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../../api";
import { IUser, IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const UsersTableRow = ({ user }: { user: IUser }) => {
  const { role, username, email, avatar_url, id, createdAt } = user || {};
  //const location = useLocation();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const { state } = useUserContext() as IUserContext;
  const { id: loggedInUserId } = state || {};
  const isMe = loggedInUserId === id;
  // delete user
  const handleUserDelete = async () => {
    try {
      await apiClient.delete(`/users/${user.id}`);
      toast.success("User deleted successfully");
      setIsDeleted(true);
    } catch (err: any) {
      toast.error("Failed to delete user");
    }
  };
  // update user role
  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const role = e.target.value;
      console.log("role:", role);
      const response = await apiClient.patch(`/users/update/${id}`, { role });
      if (response?.status === 200) {
        navigate(0);
        toast.success("User role updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };
  return (
    <tr className={`${isDeleted ? "hidden" : ""}`}>
      <td className="px-4 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={avatar_url}
            alt={username}
            className="inline-block relative object-cover object-center rounded-full w-14 h-14"
          />
        </div>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-200">
        <div className="flex flex-col">
          <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
            {username}
          </p>
        </div>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-200">
        <div className="flex flex-col">
          <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
            {email}
          </p>
        </div>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-200">
        {!isMe ? (
          <select
            onChange={handleRoleChange}
            id="status"
            name="status"
            defaultValue={role}
            className="block w-full border border-gray-300 px-2 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        ) : (
          <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
            {role}
          </p>
        )}
      </td>
      <td className="px-4 py-3.5 border-b border-gray-200">
        <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-200">
        <div className="flex gap-5">
          <button onClick={handleUserDelete} className="cursor-pointer">
            <Trash className="text-red-500" />
          </button>
          {isMe && (
            <Link
              className="px-3 py-1.5 text-white rounded-sm bg-amber-400 font-medium"
              to={`/profile/${id}`}
            >
              View Profile
            </Link>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UsersTableRow;
