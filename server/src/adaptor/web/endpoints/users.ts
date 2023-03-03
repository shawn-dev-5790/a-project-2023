import express from 'express'
import { toHttpRes } from '../http'

const router = express.Router()

router.get('/', (req: any, res) => {
  res.json({ msg: 'hello users' })
})
router.get('/:userId', async (req: any, res) => {
  const user = await req._container.userUC.getUserById({ id: req.params.userId })
  res.status(200).json(toHttpRes('200', 'success', user))
})

export const users = router
