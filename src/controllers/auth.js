import * as authService from "../services/auth.js";

export const handleRegister = async (req, res) => {
  const newUser = await authService.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: newUser,
  });
};

export const handleLogin = async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});


  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: { accessToken },
  });
};

export const handleRefresh = async (req, res) => {
  const refreshTokenFromCookie = req.cookies?.refreshToken;

  const { accessToken, refreshToken } = await authService.refreshSession(refreshTokenFromCookie);

  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});


  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: { accessToken },
  });
};


export const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    await authService.logoutUser(refreshToken);

    
    res.clearCookie("refreshToken");

    res.status(204).send(); 
  } catch (err) {
    next(err);
  }
};