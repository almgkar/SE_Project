class userSession {
  static #userId;
  static #userType;
  static #requestarea;
  static #bookId;

  constructor() {
    throw new Error("UserSession class cannot be instantiated");
  }

  static getUserId() {
    console.log(this.#userId);
    return this.#userId;
  }
  static getbookId() {
    console.log(this.#bookId);
    return this.#bookId;
  }
  static getRequestArea() {
    console.log(this.#requestarea);
    return this.#requestarea;
  }

  static setbookId(bookId) {
    this.#bookId = bookId;
  }

  static setUserId(userId) {
    this.#userId = userId;
  }
  static setRequestArea(requestarea) {
    this.#requestarea = requestarea;
  }

  static getUserType() {
    return this.#userType;
  }

  static setUserType(userType) {
    this.#userType = userType;
  }
}

export default userSession;
