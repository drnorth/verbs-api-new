import { AuthController } from "./auth.controller";
import { AuthValidator } from "./auth.validation";
import { IRouteStructure } from "types.common/route.types";

const Routes: IRouteStructure<
  typeof AuthController,
  typeof AuthValidator,
  AuthValidator
> = {
  mainRoute: "/auth",
  controller: AuthController,
  validator: AuthValidator,
  subRoutes: [
    {
      method: "post",
      route: "/register",
      action: "register",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/login",
      action: "login",
      validate: "login",
    },
    {
      method: "post",
      route: "/logout",
      action: "logout",
      validate: "emptyValidation",
    },
    {
      method: "post",
      route: "/refresh-tokens",
      action: "refreshTokens",
      validate: "refreshToken",
    },
  ],
};

export default Routes;

/**
 * @swagger
 *
 * tags:
 *   name: Auth
 *   description: Requests for authentificate
 */

/**
 * @swagger
 *
 * components:
 *
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *
 *  responses:
 *    Error:
 *      description: Error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: integer
 *                description: Error code
 *              message:
 *                type: string
 *                description: Error description
 *            example:
 *              code: 401
 *              message: Please authenticate
 *
 *  schemas:
 *    Auth:
 *      type: object
 *      properties:
 *        fastLogin:
 *          type: boolean
 *          description: Check for login from device
 *        hashKey:
 *          type: string
 *          description: generation key to access API
 *        deviceId:
 *          type: string
 *          description: ID of loggined device
 *      required:
 *        - fastLogin
 *        - hashKey
 *        - deviceId
 *
 *      example:
 *        fastLogin: true
 *        hashKey: 'fjdyesnjsuyvcennldsak'
 *        deviceId: 'QCDRT5EF-62FC-TREH-B2F5-92C9E79AGT49'
 *
 *    BarierAuth:
 *      type: object
 *      properties:
 *        access:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *            expires:
 *              type: string
 *              format: date-time
 *        refresh:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *            expires:
 *              type: string
 *              format: date-time
 *      example:
 *        access:
 *          token: access_token
 *          expires: 2021-04-20T20:24:58.252Z
 *        refresh:
 *          token: refresh_token
 *          expires: 2021-05-20T19:54:58.257Z
 *
 *
 */

/**
 * @swagger
 *
 * paths:
 *   /auth/login:
 *     post:
 *       summary: Login to service
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       responses:
 *         200:
 *           description: Success authentification
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/BarierAuth'
 *         default:
 *           $ref: '#/components/responses/Error'
 *
 */
