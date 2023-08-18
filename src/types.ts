import Vue, { ComponentOptions, ComponentInstance, VueConstructor } from 'vue'
import { VISIBLE_KEY } from './constant'

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

export interface ResolvedOptions {
  props?: PropsOptions
  on?: EventOptions
}

export type DComponentOptions = ComponentOptions<Vue>
export interface SingleSlotOptions {
  component: DComponentOptions
  propsData?: DefaultRecord
}
type SlotOptions = DComponentOptions | SingleSlotOptions
export interface SlotsOptions {
  default?: SlotOptions
  title?: SlotOptions
  footer?: SlotOptions
}
export type ContentOptions = DComponentOptions | SlotsOptions

export interface DialogHandler {
 (content: ContentOptions, options?: UserOptions): Promise<any>
}
export interface Dialog {
  readonly globalOptions: UserOptions
  options: UserOptions
  DialogCtor: VueConstructor
  vm: ComponentInstance
  content?: ContentOptions | undefined
  resolve?: DefaultFunction | undefined
  reject?: DefaultFunction | undefined

  dialog: DialogHandler
  createComponent(): ContentOptions
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogHandler;
  }
}
