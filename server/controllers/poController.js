import poModel from "../models/poModel";

export const fetchAll = async (req, res) => {
  try {
    // perform ACTION based on MODEL
    const poList = await poModel.find()
    // return a RESPONSE based on ACTION
    res.status(200).json({
      success: true,
      data: poList
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
