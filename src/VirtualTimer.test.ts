import { deepStrictEqual } from 'assert'

import { createVirtualTimer } from './VirtualTimer'

describe('VirtualTimer', () => {
  describe('given a VirtualClock', () => {
    it('allows running tasks when they are ready', () => {
      const timer = createVirtualTimer()

      let a = false
      timer.setTimer(() => (a = true), 100)

      let b = false
      timer.setTimer(() => (b = true), 500)

      timer.progressTimeBy(99)
      deepStrictEqual(a, false)
      deepStrictEqual(b, false)

      timer.progressTimeBy(1)
      deepStrictEqual(a, true)
      deepStrictEqual(b, false)

      timer.progressTimeBy(400)
      deepStrictEqual(a, true)
      deepStrictEqual(b, true)
    })
  })
})
