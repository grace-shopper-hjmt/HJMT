export const isAdmin = (state) => {
  if (state.user.isAdmin) return true
  else return false
}
