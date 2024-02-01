// TODO: Add tests for this, not 100% sure it works the way I want to but it is good enough to get the point across
export const shortenIndent = (str: string) => {
  let res = str
  while (res.startsWith('\n ')) {
    res = res.replaceAll('\n ', '\n')
  }
  if (res.startsWith('\n')) {
    res.replace('\n', '')
  }
  return res.trim()
}
