import { Config } from "../config/config"

const FILE_NAME = 'httprequest.service'

const getQuestions = async () => {
  try {
    const prefix = `${FILE_NAME} getQuestions`

    const question = await fetch(Config.services.mcq.getQuestion)

    if (!question || question.id) {
      throw Error('something went wrong. Please try again.')
    }
  } catch (error) {
    console.log(error)
  }
}

const getAnswer = async (questionId) => {
  try {
    const prefix = `${FILE_NAME} getAnswer`

    const answer = await fetch(`${Config.services.mcq.getAnswer}${questionId}`)

    if (!answer || answer.id) {
      throw Error('something went wrong. Please try again.')
    }
  } catch (error) {
    console.log(error)
  }
}