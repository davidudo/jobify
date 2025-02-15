import { inHTMLData } from 'xss-filters'

/**
 * Sanitizes input data to prevent Cross-Site Scripting (XSS) attacks.
 *
 * If the input is an object, it is serialized to a JSON string, sanitized, and
 * then parsed back into an object.
 * If the input is a string, it is sanitized directly.
 *
 * @param {string | object} - The data to sanitize. Can be a string or an
 * object.
 * @returns {string | object} - The sanitized data. Returns a string if the
 * input is a string, or an object if the input is an object.
 *
 * @example
 * const sanitizedString = clean('<script>alert("XSS")</script>');
 * console.log(sanitizedString);
 * // => "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"
 *
 * @example
 * const sanitizedObject = clean({ name: '<script>alert("XSS")</script>' });
 * console.log(sanitizedObject);
 * // => { name: "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;" }
 */
const clean = (data = '') => {
  let isObject = false
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    isObject = true
  }

  data = inHTMLData(data).trim();
  if (isObject) data = JSON.parse(data)

  return data
}

/**
 * Express middleware to sanitize request body, query, and parameters to
 * prevent XSS attacks.
 *
 * Applies the `clean` function to `req.body`, `req.query`, and `req.params`.
 *
 * @function middleware
 * @returns {Function} - Express middleware function.
 *
 * @example
 * import express from 'express'
 * import xssMiddleware from './middleware/xss.js'
 * const app = express();
 *
 * app.use(express.json());
 * app.use(xssMiddleware());
 *
 * app.post('/submit', (req, res) => {
 *   const userInput = req.body.userInput; // Already sanitized
 *   res.send(`Sanitized input: ${userInput}`);
 * });
 *
 * app.listen(3000, () => {
 *   console.log('Server is running on http://localhost:3000');
 * });
 */
const xssMiddleware = () => {
  return (req, res, next) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    next();
  };
};

export default xssMiddleware;
