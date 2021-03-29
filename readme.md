# most-virtual-scheduler

This package is home to an alternative [`Clock`]() and [`Timer`]() implementation that use "virtual"
time to progress `@most/core`s `Scheduler` forward imperatively and with precise control. This is 
designed for testing scenarios, where real asynchrony is either too slow or hard to test.

## Install

```sh
# NPM
npm i --save most-virtual-scheduler
# Yarn
yarn add most-virtual-scheduler
```

## Usage

```js
import { createVirtualScheduler } from 'most-virtual-scheduler'

// Construct our VirtualTimer-Scheduler pair
const [timer, scheduler] = createVirtualScheduler()

// Construct a stream
const stream = ... 

// Run your stream
runEffects(stream, scheduler)

// Manually "progress" time by 100 milliseconds
// All tasks scheduled to be run between 0 and 100 will be run
// in the order they were scheduled.
timer.progressTimeBy(100)
```