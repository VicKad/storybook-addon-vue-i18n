import * as React from 'react'
import I18nTool from './tools/I18nTool'
import addons, { types } from '@storybook/addons'
import { ADDON_ID } from '../shared'

// init function will be executed once when the storybook loads for the
// first time. This is a good place to add channel listeners and panels.
export function init () {
  addons.register(ADDON_ID, api => {
    // add 'Hello World' panel
    addons.add(ADDON_ID, {
      title: 'Languages',
      type: types.TOOL,
      match: ({ viewMode }) => viewMode === 'story',
      render () {
        return <I18nTool/>
      }
    })
  })
}
