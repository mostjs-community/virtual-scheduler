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
