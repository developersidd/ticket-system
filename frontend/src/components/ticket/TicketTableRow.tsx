import { EditIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../../api";
import { ITicket } from "../../context/ticket.context";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const TicketTableRow = ({ ticket }: { ticket: ITicket }) => {
  const {
    title,
    status,
    id,
    createdAt,
    adminResponse,
    createdBy: { avatar_url, email, username },
  } = ticket || {};
  const [isDeleted, setIsDeleted] = useState(false);
  const { state } = useUserContext() as IUserContext;
  const statusVariant =
    status === "OPEN"
      ? "bg-yellow-100 text-yellow-700"
      : status === "IN_PROGRESS"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700";
  // delete ticket
  const handleTicketDelete = async () => {
    try {
      await apiClient.delete(`/tickets/${ticket.id}`);
      toast.success("Ticket deleted successfully");
      setIsDeleted(true);
    } catch (err: any) {
      toast.error("Failed to delete ticket");
    }
  };
  return (
    <tr className={`${isDeleted ? "hidden" : ""}`}>
      <td className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={avatar_url}
            alt={username}
            className="inline-block relative object-cover object-center rounded-full w-9 h-9"
          />
          <div className="flex flex-col">
            <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
              {username}
            </p>
            <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              {email}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="flex flex-col">
          <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
            {title}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="flex flex-col">
          <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
            {adminResponse ? (
              adminResponse
            ) : (
              <span className="font-semibold opacity-75">No response yet</span>
            )}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="w-max">
          <div
            className={`relative grid items-center  font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md ${statusVariant}`}
          >
            <span className=""> {status?.split("_").join("   ")} </span>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200">
        <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-5">
          <Link to={`/tickets/edit/${id}`} className="" type="button">
            <EditIcon className="text-yellow-500" />
          </Link>
          {state?.id === ticket.createdBy.id && (
            <button onClick={handleTicketDelete} className="cursor-pointer">
              <Trash className="text-red-500" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TicketTableRow;
