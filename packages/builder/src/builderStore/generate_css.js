import { pipe } from "components/common/core"
import { filter, map, reduce, toPairs } from "lodash/fp"

const self = n => n
const join_with = delimiter => a => a.join(delimiter)
const empty_string_to_unset = s => (s.length ? s : "0")
const add_suffix_if_number = suffix => s => {
  try {
    if (isNaN(s) || isNaN(parseFloat(s))) return s
  } catch (_) {
    return s
  }
  return s + suffix
}

export const make_margin = values =>
  pipe(values, [
    map(empty_string_to_unset),
    map(add_suffix_if_number("px")),
    join_with(" "),
  ])

const css_map = {
  templaterows: {
    name: "grid-template-rows",
    generate: self,
  },
  templatecolumns: {
    name: "grid-template-columns",
    generate: self,
  },
  align: {
    name: "align-items",
    generate: self,
  },
  justify: {
    name: "justify-content",
    generate: self,
  },
  direction: {
    name: "flex-direction",
    generate: self,
  },
  gridarea: {
    name: "grid-area",
    generate: make_margin,
  },
  gap: {
    name: "grid-gap",
    generate: n => `${n}px`,
  },
  columnstart: {
    name: "grid-column-start",
    generate: self,
  },
  columnend: {
    name: "grid-column-end",
    generate: self,
  },
  rowstart: {
    name: "grid-row-start",
    generate: self,
  },
  rowend: {
    name: "grid-row-end",
    generate: self,
  },
  padding: {
    name: "padding",
    generate: make_margin,
  },
  margin: {
    name: "margin",
    generate: make_margin,
  },
  zindex: {
    name: "z-index",
    generate: self,
  },
  height: {
    name: "height",
    generate: self,
  },
  width: {
    name: "width",
    generate: self,
  },
}

export const generate_rule = ([name, values]) =>
  `${css_map[name].name}: ${css_map[name].generate(values)};`

const handle_grid = (acc, [name, value]) => {
  let tmp = []

  if (name === "row" || name === "column") {
    if (value[0]) tmp.push([`${name}start`, value[0]])
    if (value[1]) tmp.push([`${name}end`, value[1]])
    return acc.concat(tmp)
  }

  return acc.concat([[name, value]])
}

const object_to_css_string = [
  toPairs,
  reduce(handle_grid, []),
  filter(v => (Array.isArray(v[1]) ? v[1].some(s => s.length) : v[1].length)),
  map(generate_rule),
  join_with("\n"),
]

export const generate_css = ({ layout, position }) => {
  let _layout = pipe(layout, object_to_css_string)
  if (_layout.length) {
    _layout += `\ndisplay: ${_layout.includes("flex") ? "flex" : "grid"};`
  }

  return {
    layout: _layout,
    position: pipe(position, object_to_css_string),
  }
}

const apply_class = (id, name, styles) => `.${name}-${id} {\n${styles}\n}`

export const generate_screen_css = component_array => {
  let styles = ""
  let emptyStyles = { layout: {}, position: {} }

  for (let i = 0; i < component_array.length; i += 1) {
    const { _styles, _id, _children } = component_array[i]
    const { layout, position } = generate_css(_styles || emptyStyles)

    styles += apply_class(_id, "pos", position) + "\n"
    styles += apply_class(_id, "lay", layout) + "\n"
    if (_children && _children.length) {
      styles += generate_screen_css(_children) + "\n"
    }
  }
  return styles.trim()
}
