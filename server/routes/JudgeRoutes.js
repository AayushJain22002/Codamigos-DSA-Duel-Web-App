import Router from 'express'
import { checkBatchStatus, runBatchCode} from '../controllers/SubmissionControls.js'
const judgeRoute = Router()

judgeRoute.post('/run-code/batch', runBatchCode)
judgeRoute.get('/check-batch', checkBatchStatus)
// judgeRoute.delete('/delete-code', deleteCode)

export default judgeRoute