import { getRequestBody } from '@/helpers/networkHelpers'

export interface IRestRequestBody {
  query?: string
  restMethod?: 'get' | 'post' | 'put' | 'delete'
  variables?: Record<string, unknown>
  operationName?: string
  extensions?: Record<string, unknown>
  id?: string
  native?: {
    webRequest: chrome.webRequest.WebRequestBodyDetails
  }
}

// /** Filter out graphql requests */
// export const checkIfRestRequest = (
//   details: chrome.devtools.network.Request
// ) => {
//   const postData = JSON.parse(details.request?.postData?.text || '[{}]')
//   if (Array.isArray(postData)) {
//     return !(postData?.[0].query || postData?.[0].operationName)
//   }
//   return !(postData?.query || postData?.operationName)
// }

/**
 * Parse the body of a Rest request into an array of
 * request payloads.
 *
 * We always return an array of request payloads, even if the
 * request body is not a batch request as it simplifies the
 * handling of the request in the rest of the application.
 *
 * @param body the body of a Rest request
 * @returns an array of request payloads
 */
export const parseRestBody = (body: string): IRestRequestBody[] | undefined => {
  try {
    const requestPayload = JSON.parse(body)
    const requestPayloads = Array.isArray(requestPayload)
      ? requestPayload
      : [requestPayload]
    return requestPayloads
  } catch (error) {
    return undefined
  }
}
