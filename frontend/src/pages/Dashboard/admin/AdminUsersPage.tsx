import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "../../../api";
import UsersTable from "../../../components/users/UsersTable";
import UserUsersHeader from "../../../components/users/UsersTableHeader";
import { IUser } from "../../../context/user.context";

const AdminUsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const searchQuery = encodeURI(searchParams.get("q") || "");
  // get user users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.get(
          `/users/all?status=${status}&q=${searchQuery}`
        );
        setUsers(data?.data);
        console.log("data:", data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [status, searchQuery]);

  // decide what to render
  let content;
  if (isLoading) {
    content = <p className="text-2xl text-center py-10">Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (users.length === 0) {
    content = <p className="text-2xl text-center py-10">No users found</p>;
  } else {
    content = <UsersTable users={users} />;
  }
  return (
    <section>
      <UserUsersHeader />
      {content}
    </section>
  );
};

export default AdminUsersPage;
