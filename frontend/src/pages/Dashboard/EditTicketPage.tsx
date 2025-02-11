import AddEditTicketForm from "../../components/form/AddEditTicketForm";

const EditTicketPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-3xl leading-[67px] mb-6 text-teal-400 font-syne font-bold">
        Edit Complain Ticket
      </h3>
      <AddEditTicketForm />
    </div>
  );
};

export default EditTicketPage;
