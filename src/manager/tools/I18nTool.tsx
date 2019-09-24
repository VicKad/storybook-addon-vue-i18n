import * as React from 'react'
import { styled } from '@storybook/theming'
import { useParameter, useAddonState, useChannel } from '@storybook/api'
import { Icons, IconButton, TooltipLinkList, WithTooltip } from '@storybook/components'
import { I18nAddonParameter } from '../../types/I18nAddonParameter'
import { I18nAddonState } from '../../types/I18nAddonState'
import { ADDON_ID, PARAMETER_ID, LOCALE_CHANGED } from '../../shared'

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}))

const I18nTool = () => {
  const { defaultLanguage, languages } = useParameter<I18nAddonParameter>(
    PARAMETER_ID,
    {
      defaultLanguage: 'en_US',
      languages: []
    }
  )
  const [state, setState] = useAddonState<I18nAddonState>(
    ADDON_ID,
    {
      selected: defaultLanguage
    }
  )

  const emit = useChannel({})

  const list = languages

  if (!list || list.length === 0) {
    return null
  }

  const { selected } = state
  const item = list.find(language => language.code === selected)

  const toLinks = (list, selectedItem, setState, state, close) => {
    return list.map(ele => {
      const active = ele.code === state.selected
      return {
        id: ele.code,
        title: ele.code + (ele.title ? ' - ' + ele.title : ''),
        active: active,
        right: active ? <Icons icon="check"/> : undefined,
        onClick: () => {
          emit(LOCALE_CHANGED, ele.code)
          setState({ ...state, selected: ele.code })
          close()
        }
      }
    })
  }

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList links={toLinks(list, item, setState, state, onHide)}/>
      )}
      closeOnClick
    >
      <IconButtonWithLabel
        key="viewport"
        title="Select i18n locale"
      >
        <Icons icon="book"/>
        locale - {(item || {}).code}
      </IconButtonWithLabel>
    </WithTooltip>
  )
}

export default I18nTool
