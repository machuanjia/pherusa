/** @format */

/// <reference types="react-scripts" />
declare let APP_CONFIGRATION: any

declare module '*.less' {
  const content: Record<string, string>
  export default content
}

declare module 'camunda-bpmn-moddle/resources/camunda'

declare module 'react-color'
