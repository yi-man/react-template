import  { css_beautify, js_beautify } from 'js-beautify';

export function jsFormat(content: string) {
  // @ts-ignore
  return js_beautify(content, {indent_size: 2, brace_style: "collapse-preserve-inline", e4x: false,})
}

export function cssFormat(content: string) {
  return css_beautify(content, {indent_size: 2})
}