class errors {
  static badRequest(message) {
    return {
      status: 400,
      message,
    };
  }
  static unauthorized(message) {
    return {
      status: 401,
      message,
    };
  }
  static forbidden(message) {
    return {
      status: 403,
      message,
    };
  }
  static notFound(message) {
    return {
      status: 404,
      message,
    };
  }
  static serverError(message) {
    return {
      status: 500,
      message,
    };
  }
}
export default errors;
