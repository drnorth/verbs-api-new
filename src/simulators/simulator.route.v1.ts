import { IRouteStructure } from "types.common/route.types";
import { SimulatorController } from "./simulator.controller";
import { SimulatorValidator } from "./simulator.validation";

const Routes: IRouteStructure<
  typeof SimulatorController,
  typeof SimulatorValidator,
  SimulatorValidator
> = {
  mainRoute: "/simulators",
  controller: SimulatorController,
  validator: SimulatorValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getTest",
      validate: "get",
      auth: true,
      role: "simulators",
    },
    {
      method: "post",
      route: "/",
      action: "resultTest",
      validate: "emptyValidation",
      auth: true,
      role: "simulators",
    },
  ],
};

export default Routes;

/**
 *
 * @swagger
 *
 *  tags:
 *    name: Simulators
 *    description: Requests for simulators
 *
 */

/**
 *
 * @swagger
 *
 *  components:
 *    schemas:
 *      SimulatorTest:
 *        description: Response then type WORD or TEST
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            description: Verb ID
 *          verb:
 *            type: string
 *            description: Verb infinitive
 *          answerType:
 *            type: string
 *            enum: [inf,simple,part]
 *            description: Verb form in answers
 *          answers:
 *            type: array
 *            description: Answers for test
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  format: uuid
 *                  description: Verb ID for check correct
 *                value:
 *                  type: string
 *                  description: Answer variant
 *              required: [id,value]
 *        required: [id,verb,answerType,answers]
 *        example:
 *          id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *          verb: arise
 *          answerType: simple
 *
 *      SimulatorWrite:
 *        description: Response then type WRITE or LETTER
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            description: Verb ID
 *          verb:
 *            type: string
 *            description: Verb infinitive
 *          answerType:
 *            type: string
 *            enum: [inf,simple,part]
 *            description: Verb form in answers
 *          answer:
 *            type: string
 *            description: Correct answer
 *          shuffledLetters:
 *            type: array
 *            description: Shuffled letters array of correct answer for type LETTER
 *            items:
 *              type: string
 *          required: [id,verb,answerType,answer]
 *        example:
 *          id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *          verb: arise
 *          answerType: simple
 *          answer: arose
 *
 *      SimulatorResult:
 *        description: Result of answer
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *            description: Verb ID
 *          correct:
 *            type: boolean
 *            description: A sign of a correct answer
 *        required: [id,correct]
 *        example:
 *          id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *          correct: true
 *
 */

/**
 *
 * @swagger
 *
 *  paths:
 *    /simulators:
 *      get:
 *        tags: [Simulators]
 *        security:
 *          - bearerAuth: []
 *        summary: Get simulator by type
 *        parameters:
 *          - in: query
 *            name: type
 *            required: true
 *            description: Simulator type
 *            schema:
 *              type: string
 *              enum: [WORD,TEST,WRITE,LETTER]
 *        responses:
 *          200:
 *            description: Get random 10 verbs
 *            content:
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/schemas/SimulatorTest'
 *                    - $ref: '#/components/schemas/SimulatorWrite'
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 *      post:
 *        tags: [Simulators]
 *        security:
 *          - bearerAuth: []
 *        summary: Get simulator by type
 *        requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SimulatorResult'
 *        responses:
 *          200:
 *            description: result saved
 *            content:
 *              text/plain:
 *                schema:
 *                  type: string
 *                  description: DONE
 *          default:
 *            $ref: '#/components/responses/Error'
 *
 */
