const commentController = require("../controllers/commentController");
const validateComment = require("../middlewares/validateComment");

const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

const getAllCommentsHandler = async (req, res) => {
  try {
    const response = await commentController.getAllCommentsController();
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getReadCommentsHandler = async (req, res) => {
  try {
    const response = await commentController.getReadCommentsController();
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getOneCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.getOneCommentController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const createCommentHandler = async (req, res) => {
  const oneComment = ({ email, asunto, descripcion } = req.body);
  const { error } =
    validateComment.createCommentValidation.validate(oneComment);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  try {
    const response = await commentController.createCommentController(
      oneComment
    );
    res.status(201).send(response); // Código de estado para creación exitosa
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const physicalDeleteCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.physicalDeleteCommentController(
      id
    );
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setCommentAsReadHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.setCommentAsReadController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setCommentAsUnreadHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.setCommentAsUnreadController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const commentHandler = {
  getAllCommentsHandler,
  getReadCommentsHandler,
  getOneCommentHandler,
  createCommentHandler,
  physicalDeleteCommentHandler,
  setCommentAsReadHandler,
  setCommentAsUnreadHandler,
};

module.exports = commentHandler;