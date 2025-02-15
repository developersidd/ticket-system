import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body || {};
  // check if all required fields are provided
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please provide all required fields");
  }
  // check email with regEx
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }
  const avatarLocalPath = req?.file?.path;

  if (!avatarLocalPath) {
    // throw new ApiError(400, "Avatar and Cover Image are required");
    throw new ApiError(400, "Avatar is required");
  }

  // upload images on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const hashedPassword = await bcrypt.hash(password, 10);
  const assignedRole = req?.user?.role === "ADMIN" ? role : "USER";
  // check if user already exists
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // create user object and save to database
  const user = await prisma.user.create({
    data: {
      username,
      avatarUrl: avatar?.url,
      avatarPublicId: avatar?.public_id,
      email,
      password: hashedPassword,
      role: assignedRole,
    },
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  delete user.password;
  // send response to client
  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  // check if all required fields are provided
  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }
  // check email with regEx
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }
  // check if user exists on DB
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // check password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid user credentials");
  }
  // create access and refresh token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  // delete password from response
  user.password = undefined;

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, { ...user, token }, "User logged In successfully")
    );
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { loginUser, logoutUser, registerUser };
