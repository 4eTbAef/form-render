export const mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  'string:upload': 'upload',
  'string:date': 'date',
  'string:dateTime': 'date',
  'string:time': 'date',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'imageInput',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  '*?enum': 'select',
  'array?enum': 'checkboxes',
  '*?readonly': 'text',
};

export function getWidgetName(schema, _mapping = mapping) {
  const { type, format, enum: enums, readonly } = schema;

  // 如果已经注明了渲染widget，那最好
  // if (schema['ui:widget']) {
  //   return schema['ui:widget'];
  // }

  const list = [];
  if (readonly) {
    list.push(`${type}?readonly`);
    list.push('*?readonly');
  }
  if (enums) {
    list.push(`${type}?enum`);
    // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select
    list.push('*?enum');
  }
  if (format) {
    list.push(`${type}:${format}`);
  }
  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件
  let found = '';
  list.some(item => {
    found = _mapping[item];
    return !!found;
  });
  return found;
}

export const extraSchemaList = {
  checkbox: {
    valuePropName: 'checked',
  },
  switch: {
    valuePropName: 'checked',
  },
};
