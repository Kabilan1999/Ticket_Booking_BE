const adminModel = require("../model/adminSchema");
const generateToken = require("../config/generateToken");
const successMessage = {
  status: "Success",
  data: {},
  errorCode: 200,
};
const errorMessage = {
  status: "Failure",
  errorMessage: "",
  errorCode: 400,
};

const getAllAdmin = async (req, res) => {
  try {
    let admin = await adminModel.find();
    // const updatedAdmin = admin.map((doc) => {
    //   return {
    //     ...doc.toObject(),
    //     fullName: doc.fullName, // Add a new field dynamically
    //   };
    // });
    res.status(200).json({ ...successMessage, data: admin });
  } catch (error) {
    res.status(404).json({ ...errorMessage, errorMessage: error.message });
  }
};

const createNewAdmin = async (req, res) => {
  try {
    if (req.body.id) {
      const updatedAdmin = {
        id: req.body.id,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        modifiedAt: Date.now(),
      };
      const existingUser = await adminModel.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });
      if (existingUser) {
        return res.status(400).json({
          ...errorMessage,
          errorMessage: "Data already exists. Please enter a unique data.",
        });
      }
      const admin = await adminModel.findOneAndUpdate(
        { id: req.body.id },
        updatedAdmin,
        { new: true, runValidators: true }
      );
      if (!admin) {
        return res.status(400).json({
          ...errorMessage,
          errorMessage: "Admin not found",
        });
      }
      res.status(200).json({ ...successMessage, data: admin });
    } else {
      const existingMail = await adminModel.findOne({
        email: req.body.email,
      });
      const existingUser = await adminModel.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });
      if (existingUser) {
        return res.status(400).json({
          ...errorMessage,
          errorMessage: "Data already exists. Please enter a unique data.",
        });
      }
      if (existingMail) {
        return res.status(400).json({
          ...errorMessage,
          errorMessage:
            "Mail Id already exists. Please enter a different mail id.",
        });
      }
      const admin = await adminModel.find();
      const newAdmin = new adminModel({
        id: admin?.length ? admin[admin.length - 1].id + 1 : 1,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        createdAt: Date.now(),
      });
      await newAdmin.save();
      res.status(200).json({ ...successMessage, data: newAdmin });
    }
  } catch (error) {
    res.status(400).json({ ...errorMessage, errorMessage: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    console.log(req);
    const admin = await adminModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!admin) {
      return res.status(400).send("admin not found");
    }
    res
      .status(200)
      .json({ ...successMessage, data: "admin deleted successfully" });
  } catch (error) {
    res.status(404).json({ ...errorMessage, errorMessage: error.message });
  }
};

const adminCheck = async (req, res) => {
  try {
    const existingUser = await adminModel.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (existingUser) {
      const token = generateToken(existingUser);
      res.status(200).json({
        ...successMessage,
        data: {
          isAdmin: true,
          token,
        },
      });
    } else {
      res.status(200).json({
        ...successMessage,
        data: {
          isAdmin: false,
        },
      });
    }
  } catch (error) {
    res.status(404).json({ ...errorMessage, errorMessage: error.message });
  }
};

module.exports = {
  getAllAdmin,
  createNewAdmin,
  deleteAdmin,
  adminCheck,
};
