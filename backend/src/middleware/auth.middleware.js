import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
const verifyToken = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });
    console.log("user:", user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    delete user.password;
    req.user = { ...user };
    next();
  } catch (error) {
    console.log("error:", error);
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

const authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden access");
    }
    next();
  };
};

export { authorizeRoles, verifyToken };
