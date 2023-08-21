const asyncHadller = (cd) => async (req, res, next) => {
  try {
    await cd(req, res, next);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
  return true;
};
export default asyncHadller;
