export const isAdmin = state => {
  if (state.user.isAdmin) return true
  else return false
}

//make a auth function for isAdmin or is UserId
