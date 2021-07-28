import { IRouteStructure } from "types.common/route.types";
import { VerbController } from "./verb.controller";
import { VerbValidator } from "./verb.validation";

const Routes: IRouteStructure<
  typeof VerbController,
  typeof VerbValidator,
  VerbValidator
> = {
  mainRoute: "/verbs",
  controller: VerbController,
  validator: VerbValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getAll",
      validate: "emptyValidation",
      auth: true,
      role: "getVerbs",
    },
    {
      method: "post",
      route: "/",
      action: "addVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
    {
      method: "get",
      route: "/:id",
      action: "findVerb",
      validate: "emptyValidation",
      auth: true,
      role: "getVerbs",
    },
    {
      method: "put",
      route: "/:id",
      action: "updateVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
    {
      method: "delete",
      route: "/:id",
      action: "deleteVerb",
      validate: "emptyValidation",
      auth: true,
      role: "manageVerbs",
    },
  ],
};

export default Routes;

/**
 *
 * @swagger
 *
 * tags:
 *  name: Verbs
 *  description: Requests for verbs
 */

/**
 *
 * @swagger
 *
 *  components:
 *    schemas:
 *      Verbs:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            description: Id in base
 *          inf:
 *            type: string
 *            description: Infinitive of verb
 *          simple:
 *            type: string
 *            descirtion: Second form of verb
 *          part:
 *            type: string
 *            description: Third form of verb
 *          translations:
 *            type: string
 *            description: Translations of verb
 *          difficult:
 *            type: string
 *            enum: [EASY,MIDDLE,HARD]
 *            descrition: Type of difficulty for learning
 *        example:
 *          inf: arise
 *          simple: arose
 *          part: arisen
 *          translations: 'подниматься'
 *          difficult: HARD
 */

/**
 *
 * @swagger
 *
 *  paths:
 *    /verbs:
 *
 *      get:
 *        tags: [Verbs]
 *        security:
 *          - bearerAuth: []
 *        summary: Returns a list of verbs
 *        responses:
 *          200:
 *            description: A JSON array of verbs
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Verbs'
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 *      post:
 *        tags: [Verbs]
 *        security:
 *          - bearerAuth: []
 *        summary: Add verb to base
 *        requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verbs'
 *        responses:
 *          200:
 *            description: Verb is adding
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Verbs'
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 *
 *    /verbs/{id}:
 *
 *      get:
 *        tags: [Verbs]
 *        security:
 *          - bearerAuth: []
 *        summary: Return the verb by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The verb ID
 *            schema:
 *              type: string
 *              format: uuid
 *        responses:
 *          200:
 *            description: The verb by ID
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Verbs'
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 *      put:
 *        tags: [Verbs]
 *        security:
 *          - bearerAuth: []
 *        summary: Change the verb by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The verb ID
 *            schema:
 *              type: string
 *              format: uuid
 *        requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Verbs'
 *        responses:
 *          200:
 *            description: Message about change
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                  example:
 *                    message: success
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 *      delete:
 *        tags: [Verbs]
 *        security:
 *          - bearerAuth: []
 *        summary: Delete the verb by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The verb ID
 *            schema:
 *              type: string
 *              format: uuid
 *        responses:
 *          200:
 *            description: Message about delete
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                  example:
 *                    message: deleted
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 */
