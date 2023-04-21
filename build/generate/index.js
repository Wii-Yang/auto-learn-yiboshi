const ResEdit = require('resedit')
const PELibrary = require('pe-library')
const fs = require('fs')

let data = fs.readFileSync('./bin/yiboshi-learn.exe')
let exe = PELibrary.NtExecutable.from(data)
let res = PELibrary.NtExecutableResource.from(exe)

let iconFile = ResEdit.Data.IconFile.from(fs.readFileSync('./build/icon/favicon.ico'))

ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
  res.entries,
  1,
  1033,
  iconFile.icons.map((item) => item.data)
)

res.outputResource(exe)
let newBinary = exe.generate()
fs.writeFileSync('./bin/学习医博士.exe', new Buffer.from(newBinary))
