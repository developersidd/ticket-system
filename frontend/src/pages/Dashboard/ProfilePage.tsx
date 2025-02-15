import ProfileAvatar from "../../components/dashboard/ProfileAvatar";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const Profile = () => {
  const { state } = useUserContext() as IUserContext;
  const { username, role, avatar_url, email, id } = state || {};
  return (
    <section>
      <div className="flex items-center justify-center p-7   shadow  rounded-xl gap-7 2xl:gap-14">
        <ProfileAvatar
          data={{
            avatar_url,
            username,
            id,
          }}
        />
        <div className="mr-auto text-black  space-y-3">
          <h2 className="text-3xl uppercase font-bold pb-3"> {username} </h2>
          <h2 className="text-xl text-gray-500"> Role: {role} </h2>
          <h2 className="text-xl text-gray-500"> Email: {email} </h2>
          <h2 className="text-xl text-gray-500">
            {" "}
            Status:{" "}
            <span className="ml-1 text-green-500 px-3 py-0.5 rounded-md bg-green-200">
              {" "}
              Active{" "}
            </span>{" "}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Profile;
