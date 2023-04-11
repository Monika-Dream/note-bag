const userObj = {
  Monika: {
    优秀: () => {
      console.log('不亏是你')
    },
    差: () => {
      console.log('???')
    },
  },
}
function tactics(name, poem) {
  userObj[name][poem] ? userObj[name][poem]() : console.log('BUG')
}
