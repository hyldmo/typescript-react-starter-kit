import { createAction } from './actionCreator'

export default {
	generateUser: createAction<'USER_CREATE'>('USER_CREATE'),
	loadUser: createAction<'USER_LOAD'>('USER_LOAD'),
	loadUserSuccess: createAction<'USER_LOAD_SUCCESS', string>('USER_LOAD_SUCCESS')
}
