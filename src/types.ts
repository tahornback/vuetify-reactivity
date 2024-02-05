export interface ShallowObjectExampleModelValue {
    foo: string
    fizz: string
}

export interface WatchTriggers {
    variable: string
    deep: boolean
}

export type UpdateModelValueHandler = (x: any) => void

export interface PropValue {
    name: string
    value: any
}
