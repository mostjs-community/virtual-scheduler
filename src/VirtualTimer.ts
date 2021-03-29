import { Disposable, Handle, Timer } from '@most/types'

import { Arity1, VirtualTimeline } from './internal'
import { createVirtualClock, VirtualClock } from './VirtualClock'

/**
 * A VirtualTimer is an extension of @most/core's built-in Timer, but when progressing time
 * it will run any tasks at or before the time progressed to. It implements a Disposable instance
 * in the event you would like to remove all tasks previously scheduled.
 */
export interface VirtualTimer extends Timer, VirtualClock, Disposable {}

export function createVirtualTimer(clock: VirtualClock = createVirtualClock()): VirtualTimer {
  const timeline = new VirtualTimeline()

  function delay(delayMS: number, f: Arity1<number, any>): Disposable {
    const time = clock.now() + delayMS

    timeline.addTask(time, f)

    return { dispose: () => timeline.removeTask(time, f) }
  }

  function runTasks() {
    const currentTime = clock.now()
    const tasks = timeline.readyTasks(currentTime)

    tasks.forEach((task) => task(currentTime))
  }

  let id = 0
  const disposables = new Map<Handle, Disposable>()

  function setTimer(f: () => void, delayMS: number): Handle {
    const handle = id++

    disposables.set(
      handle,
      delay(delayMS, () => {
        disposables.delete(handle)
        f()
      }),
    )

    return handle
  }

  function clearTimer(handle: Handle) {
    disposables.get(handle)?.dispose()
  }

  function dispose() {
    disposables.forEach((d) => d.dispose())
    disposables.clear()
  }

  return {
    ...clock,
    setTimer,
    clearTimer,
    dispose,
    progressTimeBy: (elapsed) => {
      const time = clock.progressTimeBy(elapsed)

      runTasks()

      return time
    },
  }
}
