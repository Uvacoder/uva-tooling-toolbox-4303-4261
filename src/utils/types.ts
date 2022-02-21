/**
 * Unpack the element type from an array
 * @example
 * ```ts
 * const array = ["foo", "bar"] as const
 * type ElementType = Unpack<typeof array>
 * assertType<ElementType, "foo" | "bar">()
 * ```
 * @param T The array type
 */
export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends readonly (infer U)[]
  ? U
  : never
