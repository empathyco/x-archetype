import type { XEventsTypes } from '@empathyco/x-components'

export const eventsToOpenEmpathize: (keyof XEventsTypes)[] = [
  'UserFocusedSearchBox',
  'UserIsTypingAQuery',
  'UserClickedSearchBox',
]
