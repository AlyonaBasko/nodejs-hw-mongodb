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

export const handleRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ status: 401, message: "No refresh token provided" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await authService.refreshSession(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};




export const logoutUserController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ status: 401, message: "No refresh token provided" });

    await authService.logoutUser(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
