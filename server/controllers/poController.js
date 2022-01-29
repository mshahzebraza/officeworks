import poModel from "../models/poModel";

export const poController = (req, res) => {
  res.status(200).json({
    message: 'Success',
    data: 'All POs'
  });
};

export const fetchPO = async (req, res) => {
  try {
    // perform ACTION based on MODEL
    const allPOs = await poModel.find()
    // return a RESPONSE based on ACTION
    res.status(200).json({
      success: true,
      data: allPOs
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      error
    })

  }
};

export const createPO = async (req, res) => {
  try {
    // perform ACTION based on MODEL
    const po = await poModel.create(req.body)
    // return a RESPONSE based on ACTION
    res.status(200).json({
      success: true,
      data: po
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      error
    })

  }
};
