import { User } from 'types'
import { createAction } from './actionCreator'

export default {
	generateUser: createAction<'USER_CREATE'>('USER_CREATE'),
	loadUser: createAction<'USER_LOAD'>('USER_LOAD'),
	loadUserSuccess: createAction<'USER_LOAD_SUCCESS', User>('USER_LOAD_SUCCESS')
}
