const getAllProjects = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message
    });
  }
}

const getProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get project info",
      error: error.message
    });
  }
}

const createProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
}

const updateProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
}

const deleteProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(' error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
}
