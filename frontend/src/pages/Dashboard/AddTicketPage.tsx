import AddTicketForm from "../../components/form/AddEditTicketForm";

const AddTicketPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-3xl leading-[67px] mb-6 text-teal-400 font-syne font-bold">
        Create Complain Ticket
      </h3>
      <AddTicketForm />
    </div>
  );
};

export default AddTicketPage;
