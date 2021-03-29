import { newScheduler, newTimeline } from '@most/scheduler'
import { Scheduler } from '@most/types'

import { createVirtualTimer, VirtualTimer } from './VirtualTimer'

/**
 * Create a [VirtualTimer, Scheduler] pair
 */
export const createVirtualScheduler = (): readonly [timer: VirtualTimer, scheduler: Scheduler] => {
  const timer: VirtualTimer = createVirtualTimer()
  const scheduler = newScheduler(timer, newTimeline())

  return [timer, scheduler] as const
}
