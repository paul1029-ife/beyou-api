const { Router } = require("express");
const { clerkClient } = require("@clerk/express");

const userRouter = Router();

// Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
      details: error.message,
    });
  }
});

// Get user by ID
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user",
      details: error.message,
    });
  }
});

// Create new user
userRouter.post("/", async (req, res) => {
  try {
    const { emailAddress, password, firstName, lastName } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const params = {
      emailAddress: [{ emailAddress, verified: false }],
      password,
      firstName,
      lastName,
    };

    const user = await clerkClient.users.createUser(params);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
});

// Update user
userRouter.patch("/:id", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress } = req.body;

    const params = {};
    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (emailAddress) {
      params.emailAddress = [
        {
          emailAddress,
          verified: false,
        },
      ];
    }

    const user = await clerkClient.users.updateUser(req.params.id, params);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update user",
      details: error.message,
    });
  }
});

// Delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    await clerkClient.users.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user",
      details: error.message,
    });
  }
});

module.exports = userRouter;
