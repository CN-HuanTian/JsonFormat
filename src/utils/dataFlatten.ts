import type { ValueType, FullType, DataFlattenType } from '@/types/jsonPreCode'
/**
 * 默认返回值的头部和尾部
 */
const boundary: { start: DataFlattenType; end: DataFlattenType } = {
  start: {
    key: [],
    value: '{',
    type: ['ObjectStart'],
    isEnd: false,
  },
  end: {
    key: [],
    value: '}',
    type: ['ObjectEnd'],
    isEnd: false,
  },
}

/**
 * JSON扁平化工具
 * @param inputObject 要格式化的JSON
 */
export default function objectFlatten(inputObject: object | undefined): DataFlattenType[] {
  if (inputObject) {
    // 获取解析后的值
    const res: DataFlattenType[] = objectFlattenCore(inputObject as Record<string, unknown>)
    // 头尾添加标记
    res.unshift(boundary.start)
    res.push(boundary.end)
    return res
  } else {
    return []
  }
}

/**
 * JSON扁平化工具(核心算法)
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
  /** 当前对象的所有key */
  const keys: string[] = Object.keys(inputObject)

  // 遍历传递的JSON对象
  for (let index = 0; index < keys.length; index++) {
    /** 当前key */
    const key: string = keys[index] as string

    /** 是否为最后一个元素 */
    const isEnd = index === keys.length - 1

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
        isEnd: isEnd,
      })
    }
    // 复合数据类型,进行递归处理
    else {
      // 开始标签
      initList.push({
        key: currentPathList,
        value: type === 'Array' ? '[' : '{',
        type: [...typeList, (type + 'Start') as FullType],
        isEnd: isEnd,
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
        isEnd: isEnd,
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

/**
 * Json转字符串
 */
export function jsonToString(data: DataFlattenType[]): string {
  console.log(data)
  const res: string[] = []
  for (const index in data) {
    const item = data[index] as DataFlattenType

    let str = ''
    // 添加空格
    str += ''.padStart(item.key.length * 4, ' ')
    // key
    if (
      !(
        item.type[item.type.length - 2] == 'Array' ||
        item.type[item.type.length - 1] == 'ArrayEnd' ||
        item.type[item.type.length - 1] == 'ObjectEnd'
      ) &&
      item.key.length >= 1
    ) {
      str += `"` + item.key[item.key.length - 1] + '":'
    }

    // value
    str += getValueContent(item.type[item.type.length - 1], item.value)

    // 尾部逗号
    if (
      !['ArrayStart', 'ObjectStart'].includes(item.type[item.type.length - 1] as string) &&
      Number(index) != data.length - 1 &&
      !item.isEnd
    ) {
      str += ','
    }
    res.push(str)
  }
  console.log(res.join('\n'))
  return res.join('\n')
}

/** 获取value内容 */
function getValueContent(type: FullType | undefined, value: unknown) {
  switch (type) {
    case 'String':
      const res = (value as string).replace(/\n/g, '')
      return `"${res}"`
    case 'Null':
      return 'null'
    default:
      return value
  }
}
