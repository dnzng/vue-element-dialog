import v2 from './v2'

export default function (app, ...args) {
  const version = Number(app.version.split('.')[0])
  if (version >= 3) {
    // v3
  } else {
    v2.init(app, ...args)
  }
}
