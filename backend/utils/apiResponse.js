class ApiResponse {
  constructor(success, data, message, statusCode) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }

  static success(data, message = 'Success', statusCode = 200) {
    return new ApiResponse(true, data, message, statusCode);
  }

  static error(message = 'Error', statusCode = 400) {
    return new ApiResponse(false, null, message, statusCode);
  }
}

module.exports = ApiResponse;