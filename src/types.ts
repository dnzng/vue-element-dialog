import type Vue from 'vue'
import type { ComponentOptions, ComponentInstance } from 'vue'
import type { VISIBLE_KEY } from './constant'

export type DefaultFunction = (...args: any[]) => void

type PropsOptions = {
  visible?: boolean
  title?: string
  width?: string
  fullscreen?: boolean
  top?: string
  modal?: boolean
  'modal-append-to-body'?: boolean
  'append-to-body'?: boolean
  'lock-scroll'?: boolean
  'custom-class'?: string
  'close-on-click-modal'?: boolean
  'close-on-press-escape'?: boolean
  'show-close'?: boolean
  'before-close'?: (done: () => void) => void
  center?: boolean
  'destroy-on-close'?: boolean
}

export type EventOptions = {
  open?: () => void
  opened?: () => void
  close?: () => void
  closed?: () => void
  [VISIBLE_KEY]?: (value: boolean) => void
}

export type UserOptions = PropsOptions & EventOptions

export interface ResolvedOptions {
  props?: PropsOptions
  on?: EventOptions
}

export type VComponentOptions = ComponentOptions<Vue>
export interface SingleSlotOptions {
  component: VComponentOptions
  propsData?: Record<string, any>
}
type SlotOptions = VComponentOptions | SingleSlotOptions
export interface SlotsOptions {
  default?: SlotOptions
  title?: SlotOptions
  footer?: SlotOptions
}
export type ContentOptions = VComponentOptions | SlotsOptions

export interface DialogHandler {
 (content: ContentOptions, options?: UserOptions): Promise<any>
}
export interface DialogInstance {
  globalOptions: UserOptions
  rootOptions: VComponentOptions
  options: UserOptions
  vm?: ComponentInstance | null
  content?: ContentOptions
  resolve?: DefaultFunction
  reject?: DefaultFunction

  dialog: DialogHandler
  getInstance(): ComponentInstance
  createComponent(): ContentOptions
  destroy(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogHandler;
  }
}
