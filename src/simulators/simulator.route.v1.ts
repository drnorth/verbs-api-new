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
 *          type:
 *            type: string
 *            enum: [WORD,TEST,WRITE,LETTER]
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
 *              example:
 *                id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *                value: arose
 *        required: [id,verb,answerType,answers,type]
 *        example:
 *          id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *          verb: arise
 *          answerType: simple
 *          type: WORD
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
 *          type:
 *            type: string
 *            enum: [WORD,TEST,WRITE,LETTER]
 *          answer:
 *            type: string
 *            description: Correct answer
 *          shuffledLetters:
 *            type: array
 *            description: Shuffled letters array of correct answer for type LETTER
 *            items:
 *              type: string
 *        required: [id,verb,answerType,answer,type]
 *        example:
 *          id: 12d3f7bd-c727-47e0-a17d-4e3788d68dfb
 *          verb: arise
 *          type: WRITE
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
 *            default: WORD
 *            description: Simulator type
 *            schema:
 *              type: string
 *              enum: [WORD,TEST,WRITE,LETTER]
 *          - in: query
 *            name: countAnswers
 *            default: 6
 *            description: Count answers in simulator types WORD and TEST
 *            schema:
 *              type: number
 *          - in: query
 *            name: countVerbs
 *            default: 10
 *            description: Count verbs in simulator
 *            schema:
 *              type: number
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
