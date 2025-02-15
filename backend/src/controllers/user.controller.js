import prisma from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const { status, q } = req.query;
  const filterBy = status === "all" ? null : encodeURI(status?.toUpperCase());
  const searchBy = q && encodeURI(q?.toLowerCase());
  console.log("searchBy:", searchBy);
  const query = {};
  if (filterBy) {
    query.role = filterBy;
  }
  if (searchBy) {
    query.OR = [
      {
        username: {
          contains: searchBy,
        },
      },
      {
        email: {
          contains: searchBy,
        },
      },
    ];
  }
  const users = await prisma.user.findMany({
    where: {
      ...query,
    },
  });
  console.log("users:", users)
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// update user info
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  if (!(username || email || role)) {
    throw new ApiError(400, "Please provide at least one field to update");
  }
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username,
      email,
      role,
    },
  });
  if (!user) {
    throw new ApiError(500, "Error occurred while updating user info");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User info updated successfully"));
});

// change  avatar
const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  const reqUser = req?.user || {};
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const { public_id, url } = (await uploadOnCloudinary(avatarLocalPath)) || {};

  if (!url) {
    throw new ApiError(500, "Error occurred while updating avatar");
  }

  const user = await prisma.user.update({
    where: {
      id: reqUser?.id,
    },
    data: {
      avatar_url: url,
      avatar_public_id: public_id,
    },
  });
  if (!user) {
    throw new ApiError(500, "Error occurred while updating avatar");
  }
  // delete avatar from cloudinary
  const delRes = await deleteFromCloudinary(reqUser?.avatar_public_id);
  console.log("del res:", delRes);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User avatar updated successfully"));
});

// get user report
const getUserReport = asyncHandler(async (req, res) => {
  const tickets = await prisma.ticket.groupBy({
    by: ["status"],
    where: {
      userId: parseInt(req?.user?.id),
    },
    _count: true,
  });
  const totalTickets = await prisma.ticket.count({
    where: {
      userId: parseInt(req?.user?.id),
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { tickets, totalTickets }, "Report fetched"));
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    throw new ApiError(500, "Error occurred while deleting user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserReport,
  updateAvatar,
  updateUser,
};
