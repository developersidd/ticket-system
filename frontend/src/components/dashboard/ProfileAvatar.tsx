import { Edit2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { UPDATE_USER } from "../../actions/user.acton";
import { apiClient } from "../../api";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5242880;

const ProfileAvatar = () => {
  const { state, dispatch } = useUserContext() as IUserContext;
  const { username, avatar_url = "" } = state || {};
  const [avatar, setAvatar] = useState<string>(avatar_url as string);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAvatarUpload = async (e: React.ChangeEvent) => {
    setIsUploading(true);
    const target = e.target as HTMLInputElement;
    const file = (target?.files || [])[0];
    if (!file?.name) return;
    if (file?.size >= MAX_FILE_SIZE) {
      return toast.warning("File size should be less than 5MB");
    }
    if (!ACCEPTED_FILE_TYPES.includes(file?.type || "")) {
      return toast.warning("Only .png, .jpg, .jpeg formats are supported.");
    }
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await apiClient.patch(`/users/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        const instantUrl = URL.createObjectURL(file);
        setAvatar(instantUrl);
        dispatch({
          type: UPDATE_USER,
          payload: {
            ...response?.data?.data,
            avatar_url: instantUrl,
          },
        });
        toast.success("Avatar updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative cursor-pointer">
      <button
        disabled={isUploading}
        onClick={() => {
          inputRef.current?.click();
        }}
        className="absolute cursor-pointer -top-3 -right-[5%] bg-amber-400 p-2.5 rounded-full"
      >
        {isUploading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-200 animate-spin  fill-amber-50"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Edit2Icon className="text-white" size={22} />
        )}
      </button>
      <img className="size-[250px] rounded-2xl " src={avatar} alt={username} />
      <input
        ref={inputRef}
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={handleAvatarUpload}
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default ProfileAvatar;
