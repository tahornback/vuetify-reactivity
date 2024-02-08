export interface ShallowObjectExampleModelValue {
    foo: string
    fizz: string
}

export type UpdateModelValueHandler = (x: any) => void

export interface PropValue {
    name: string
    value: any
}
