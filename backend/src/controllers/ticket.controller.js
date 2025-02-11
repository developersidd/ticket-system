import prisma from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
// create a new ticket
const createTicket = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new ApiError(400, "Title and description are required");
  }
  console.log("req?.user:", req?.user);
  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      userId: req?.user?.id,
    },
  });
  return res.status(201).json(new ApiResponse(201, ticket, "Ticket created"));
});

// get ticket by id
const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      createdBy: true,
    },
  });
  if (!ticket) {
    res.status(404);
    throw new ApiError(404, "Ticket not found");
  }
  return res.json(new ApiResponse(200, ticket, "Ticket found"));
});

// get all tickets
const getAllTickets = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filterBy = status === "all" ? undefined : status?.toUpperCase();
  const tickets = await prisma.ticket.findMany({
    where: {
      status: filterBy,
    },
    include: {
      createdBy: true,
    },
  });
  return res.json(new ApiResponse(200, tickets, "Tickets found"));
});

// get user tickets
const getUserTickets = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filterBy = status === "all" ? undefined : status?.toUpperCase();
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: parseInt(req?.user?.id),
      status: filterBy,
    },

    include: {
      createdBy: true,
    },
  });
  return res.json(new ApiResponse(200, tickets, "Tickets found"));
});

// get tickets by user id
const getTicketsByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: parseInt(id),
    },
    include: {
      createdBy: true,
    },
  });
  return res.json(new ApiResponse(200, tickets, "Tickets found"));
});

// edit ticket
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, adminResponse } = req.body;
  if (!(title || description || status || adminResponse)) {
    res.status(400);
    throw new ApiError(400, "At least one field is required");
  }
  const ticket = await prisma.ticket.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      status: status?.toUpperCase(),
      adminResponse,
    },
  });
  console.log("ticket:", ticket);
  return res.json(new ApiResponse(200, ticket, "Ticket updated"));
});

// delete ticket
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.ticket.delete({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(new ApiResponse(200, null, "Ticket deleted"));
});

export {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  getTicketsByUserId,
  getUserTickets,
  updateTicket,
};
