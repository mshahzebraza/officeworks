export const poController = (req, res) => {
  res.status(200).json({
    message: 'Success',
    data: 'All POs'
  });
};
