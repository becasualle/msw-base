import { rest } from "msw";

/**
 * List of request handlers.
 * Each handler contains method, path, and a function that would return the mocked response.
 */
export const handlers = [
  /**
   * Mocks the response for the '/login' POST request.
   *
   * @param {object} req - Information about the matching request.
   * @param {object} res - Functional utility to create the mocked response.
   * @param {object} ctx - Group of functions to set the status code, headers, body, etc., of the mocked response.
   * @returns {object} The mocked response with a status code.
   */

  rest.post("api/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(ctx.status(403), ctx.json({ errorMessage: "Not authorized" }));
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),

  rest.get("https://jsonplaceholder.typicode.com/todos/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        id: 1,
        title: "Сходить в хамам",
        completed: false,
      })
    );
  }),
];
