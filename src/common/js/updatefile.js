
export const updatefile = function (e) {
  let files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  let formData = new FormData()
  for (var i = 0; i < files.length; i++) {
    formData.append('imgurl', files[i])
  }
  return formData
}
