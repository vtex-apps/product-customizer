import { defineMessages, IntlShape } from 'react-intl'

type SubscriptionFrequencyType = 'year' | 'month' | 'week' | 'day'
type SubscriptionFrequency = [number, SubscriptionFrequencyType]

const FREQUENCY_PATTERN = /(\d{1,3})\s*(\w*?)(?:$|s|ly)/i

const messages = defineMessages({
  subscription: { id: 'store/product-customizer.subscription' },
  frequency: { id: 'store/product-customizer.subscription.frequency' },
  purchaseday: { id: 'store/product-customizer.subscription.purchaseday' },
})

const frequencyMessages = defineMessages({
  day: { id: 'store/product-customizer.subscription.frequency.day' },
  month: { id: 'store/product-customizer.subscription.frequency.month' },
  week: { id: 'store/product-customizer.subscription.frequency.week' },
  year: { id: 'store/product-customizer.subscription.frequency.year' },
})

export function isSubscription(id: string) {
  return Boolean(id.indexOf('vtex.subscription') === 0)
}

function getSubscriptionMessageId(id: string) {
  // uses the 'keyName' of vtex.subscription.key.{keyName}
  if (id.indexOf('vtex.subscription.key') === 0) {
    return messages[
      id.slice('vtex.subscription.key.'.length) as keyof typeof messages
    ]
  }

  // uses 'subscriptions' for vtex.subscription.*
  if (id.indexOf('vtex.subscription') === 0) {
    return messages.subscription
  }

  return { id }
}

export function formatSubscriptionLabel(id: string, intl: IntlShape) {
  const messageId = getSubscriptionMessageId(id)

  if (!messageId) return id

  return intl.formatMessage(messageId)
}

function parseFrequency(frequency: string): SubscriptionFrequency | null {
  const match = frequency.match(FREQUENCY_PATTERN)

  if (!match) return null

  const [, count, type] = match

  if (!type) return null

  return [+count, type as SubscriptionFrequencyType]
}

export function formatSubscriptionOptions({
  inputId,
  inputDomain,
  frequency,
  intl,
}: {
  inputId: string
  inputDomain: string[]
  frequency: string
  intl: IntlShape
}) {
  if (inputId === 'vtex.subscription.key.frequency') {
    return inputDomain.map((value) => {
      const [count, frequencyType] = parseFrequency(value) ?? []
      let inputLabel = inputId

      if (frequencyType) {
        inputLabel = intl.formatMessage(frequencyMessages[frequencyType], {
          count,
        })
      }

      return { label: inputLabel, value }
    })
  }

  if (inputId === 'vtex.subscription.key.purchaseday') {
    const [, frequencyType] = parseFrequency(frequency) ?? []

    if (frequencyType) {
      const displayWeekday = frequencyType === 'day' || frequencyType === 'week'

      return inputDomain.map((value) => {
        const optionLabel = displayWeekday
          ? intl.formatDate(new Date(+value.trim(), 0, 0), { weekday: 'long' })
          : value

        return { label: optionLabel, value }
      })
    }
  }

  return inputDomain.map((value) => ({ label: value, value }))
}
