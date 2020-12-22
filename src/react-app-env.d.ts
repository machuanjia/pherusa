/** @format */

/// <reference types="react-scripts" />
declare var APP_CONFIGRATION: any

declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}

declare module 'camunda-bpmn-moddle/resources/camunda'