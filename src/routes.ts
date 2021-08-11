import { Router } from 'express'
import activateAccount from './controllers/activeUserController'
import changePassword from './controllers/changePasswordController'
import deleteUser from './controllers/deleteUserController'
import desactiveUser from './controllers/desactiveUserController'
import refreshToken from './controllers/refreshTokenController'
import renewUser from './controllers/renewUserController'
import signIn from './controllers/signinController'
import signUp from './controllers/signUpController'
import updateUser from './controllers/updateUserController'

const routes = Router()

routes.post('/signup', signUp)
routes.post('/signin', signIn)
routes.get('/active', activateAccount)
routes.put('/renew', renewUser)
routes.post('/change-password', changePassword)
routes.put('/update-user', updateUser)
routes.post('/refresh-token', refreshToken)
routes.patch('/desactive-user', desactiveUser)
routes.delete('/delete-user', deleteUser)

export default routes