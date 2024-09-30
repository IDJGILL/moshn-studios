import { JSDOM } from 'jsdom'

export default function extractImageUrls(htmlString: string) {
  // Use a regular expression to match all img src attributes
  const srcMatches = [...htmlString.matchAll(/<img [^>]*src="([^"]*)"/g)]

  // Extract and return the src values
  return srcMatches.map((match) => match[1])
}
