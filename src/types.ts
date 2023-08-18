import { VISIBLE_KEY } from './constant'
import Vue, { ComponentOptions, Component, CreateElement, RenderContext, VNode } from 'vue'

type DefaultRecord = Record<string, any>
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

export type ResolvedOptions = {
  props?: PropsOptions
  on?: EventOptions
}

export type DialogComponent = Component & DefaultRecord
export interface DialogComponentOptions extends ComponentOptions<Vue> {
  render?(
    this: DialogComponent,
    createElement: CreateElement,
    hack: RenderContext<DefaultRecord>
  ): VNode | null | void
}
export type SingleSlotOptions = {
  component: DialogComponentOptions
  propsData?: DefaultRecord
}
type SlotOptions = DialogComponentOptions | SingleSlotOptions
export type SlotsOptions = {
  default?: SlotOptions
  title?: SlotOptions
  footer?: SlotOptions
}
export type ContentOptions = DialogComponentOptions | SlotsOptions

type DialogHandler = (content: ContentOptions, options?: UserOptions) => Promise<any>
export interface Dialog {
  readonly globalOptions: UserOptions
  options: UserOptions
  vm: DialogComponent
  content?: ContentOptions | undefined
  resolve?: DefaultFunction | undefined
  reject?: DefaultFunction | undefined

  dialog: DialogHandler
  createVueInstance: () => DialogComponent
  createComponent(): DialogComponentOptions
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogHandler;
  }
}
