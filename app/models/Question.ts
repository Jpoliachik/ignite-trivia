import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const QuestionModel = types
  .model("Question")
  .props({
    id: types.identifier,
    category: types.maybe(types.string),
    type: types.enumeration(["multiple", "boolean"]),
    difficulty: types.enumeration(["easy", "medium", "hard"]),
    question: types.maybe(types.string),
    correctAnswer: types.maybe(types.string),
    incorrectAnswers: types.optional(types.array(types.string), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Question extends Instance<typeof QuestionModel> {}
export interface QuestionSnapshotOut extends SnapshotOut<typeof QuestionModel> {}
export interface QuestionSnapshotIn extends SnapshotIn<typeof QuestionModel> {}
export const createQuestionDefaultModel = () =>
  types.optional(QuestionModel, {
    id: "",
    type: "multiple",
    difficulty: "easy",
  })
