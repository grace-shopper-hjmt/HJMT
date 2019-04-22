/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllSunglasses} from './all-sunglasses'
export {SingleSunglasses} from './single-sunglasses'
export {NewSunglasses} from './NewSunglasses'
export {EditSunglasses} from './EditSunglasses'
export {Review} from './reviews'
export {default as AllUsers} from './all-users'
export { default as SingleUser } from './single-user'
export { EditUsers}from './EditUsers'
