/** 基础数据类型 */
export type ValueType = 'String' | 'Number' | 'Boolean' | 'Object' | 'Array' | 'Null'

/** 扩展数据类型 */
type ExtendType = 'ObjectStart' | 'ObjectEnd' | 'ArrayStart' | 'ArrayEnd'

/** 全部数据类型 */
export type FullType = ValueType | ExtendType

/** 扁平化数据类型 */
export interface DataFlattenType {
  /** key列表 */
  key: string[]
  /** 当前key对应的值 */
  value: unknown
  /** 数据类型列表 */
  type: FullType[]
  /** 是否为对象或数组的最后一个元素 */
  isEnd: boolean
}
