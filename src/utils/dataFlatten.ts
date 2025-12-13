import type { ValueType, FullType, DataFlattenType } from '@/types/global'

/**
 * JSON扁平化工具
 * @param inputObject 要格式化的JSON
 */
export default function objectFlatten(inputObject: object | undefined): DataFlattenType[] {
  if (inputObject) {
    return objectFlattenCore(inputObject as Record<string, unknown>)
  } else {
    return []
  }
}

/**
 * JSON扁平化工具
 * @param inputObject 要格式化的JSON
 * @param initList 初始化时使用的存放列表
 * @param pathList 存放当前的路径列表
 * @param typeList 存放当前层级的类型列表
 */
function objectFlattenCore(
  inputObject: Record<string, unknown>,
  initList: DataFlattenType[] = [],
  pathList: string[] = [],
  typeList: FullType[] = [],
): DataFlattenType[] {
  // 遍历传递的JSON对象
  for (const key in inputObject) {
    /** 获取当前值的数据类型 */
    const type: ValueType = getValueType(inputObject[key])

    // 克隆路径列表,防止深度引用导致数据同步修改
    /** 当前层路径列表 */
    const currentPathList: string[] = [...pathList]
    // 添加当前层key
    currentPathList.push(key)

    // 基础数据类型,直接推入列表
    if (['String', 'Number', 'Boolean', 'Null'].includes(type)) {
      /** 当前层类型列表 */
      const currentTypeList: FullType[] = [...typeList]
      // 推入当前数据类型
      currentTypeList.push(type)
      initList.push({
        key: currentPathList,
        value: inputObject[key],
        type: currentTypeList,
      })
    }
    // 复合数据类型,进行递归处理
    else {
      // 开始标签
      initList.push({
        key: currentPathList,
        value: type === 'Array' ? '[' : '{',
        type: [...typeList, (type + 'Start') as FullType],
      })

      // 递归处理子集数据
      objectFlattenCore(
        inputObject[key] as Record<string, unknown>,
        initList,
        [...pathList, key],
        [...typeList, type],
      )

      // 结束标签
      initList.push({
        key: currentPathList,
        value: type === 'Array' ? ']' : '}',
        type: [...typeList, (type + 'End') as FullType],
      })
    }
  }
  return initList
}
/**
 * 获取数据类型
 * @param data 要获取类型的数据
 * @returns 数据类型
 */
function getValueType(data: unknown): ValueType {
  return Object.prototype.toString.call(data).slice(8, -1) as ValueType
}
