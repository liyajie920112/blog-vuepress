function pZero(v) {
  return ('00' + v).slice(-2)
}
exports.formatDate = function(timestamp) {
  if (!timestamp) {
    timestamp = Date.now()
  }
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = pZero(date.getMonth() + 1)
  const day = pZero(date.getDate())
  const hour = pZero(date.getHours())
  const minute = pZero(date.getMinutes())
  return `${year}-${month}-${day} ${hour}:${minute}`
}
