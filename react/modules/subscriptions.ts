import { defineMessages, IntlShape } from 'react-intl'

type SubscriptionFrequencyType = 'year' | 'month' | 'week' | 'day'
type SubscriptionFrequency = {
  interval: number
  type: SubscriptionFrequencyType
}

const FREQUENCY_PATTERN = /(\d{1,3})\s*(\w*?)(?:$|s|ly)/i

const SUBSCRIPTION_PREFIX = `vtex.subscription`
const SUBSCRIPTION_KEY_PREFIX = `${SUBSCRIPTION_PREFIX}.key`

export const SUBSCRIPTION_KEY_FREQUENCY = `${SUBSCRIPTION_KEY_PREFIX}.frequency`
export const SUBSCRIPTION_KEY_PURCHASEDAY = `${SUBSCRIPTION_KEY_PREFIX}.purchaseday`

const messages = defineMessages({
  subscription: { id: 'store/product-customizer.subscription' },
  frequency: { id: 'store/product-customizer.subscription.frequency' },
  purchaseday: { id: 'store/product-customizer.subscription.purchaseday' },
  purchaseDayLabel: {
    id: 'store/product-customizer.subscription.purchaseday.day',
  },
})

const frequencyMessages = defineMessages({
  day: { id: 'store/product-customizer.subscription.frequency.day' },
  month: { id: 'store/product-customizer.subscription.frequency.month' },
  week: { id: 'store/product-customizer.subscription.frequency.week' },
  year: { id: 'store/product-customizer.subscription.frequency.year' },
})

export function isSubscription(id: string) {
  return Boolean(id.indexOf(SUBSCRIPTION_PREFIX) === 0)
}

function getSubscriptionMessageId(id: string) {
  // uses the 'keyName' of vtex.subscription.key.{keyName}
  if (id.indexOf(SUBSCRIPTION_KEY_PREFIX) === 0) {
    return messages[
      id.slice(SUBSCRIPTION_KEY_PREFIX.length + 1) as keyof typeof messages
    ]
  }

  // uses 'subscriptions' for vtex.subscription.*
  if (id.indexOf(SUBSCRIPTION_PREFIX) === 0) {
    return messages.subscription
  }

  return { id }
}

export function formatSubscriptionLabel(id: string, intl: IntlShape) {
  const messageId = getSubscriptionMessageId(id)

  if (!messageId) return id

  return intl.formatMessage(messageId)
}

export function parseFrequency(
  frequency?: string
): SubscriptionFrequency | undefined {
  if (frequency == null) return undefined

  const match = frequency.match(FREQUENCY_PATTERN)

  if (!match) return undefined

  const [, count, type] = match

  if (!type) return undefined

  return {
    interval: +count,
    type: type as SubscriptionFrequencyType,
  }
}

export function formatSubscriptionOptions({
  inputId,
  inputDomain,
  frequency,
  intl,
}: {
  inputId: string
  inputDomain: string[]
  frequency: SubscriptionFrequency
  intl: IntlShape
}) {
  if (inputId === SUBSCRIPTION_KEY_FREQUENCY) {
    return inputDomain.map((value) => {
      const { interval, type } = parseFrequency(value) ?? {}
      let inputLabel = inputId

      if (type) {
        inputLabel = intl.formatMessage(frequencyMessages[type], {
          interval,
        })
      }

      return { label: inputLabel, value }
    })
  }

  if (inputId === SUBSCRIPTION_KEY_PURCHASEDAY && frequency.type) {
    const displayWeekday = frequency.type === 'day' || frequency.type === 'week'

    // use object to remove possible duplicates
    const options: Record<string, string> = {}

    inputDomain.forEach((value) => {
      let numericValue = +value.trim()

      // Purchase day is a single field in the back-end.
      // However, given the possibility of having both weekly and monthly,
      // it's possible to end up with values like 20, 25, 28
      // for a weekly interval, which accepts only values between 0 and 6
      // the if below fixes the value and any possible duplicate week days
      // are removed, preventing a broken UI.
      if (displayWeekday) {
        if (numericValue > 6) {
          // clamp to between 0..6 if number is greater than 6
          numericValue %= 7
        }
      }
      // for the same reason above, we can end up with a monthly config
      // with the initial day as "0", which is invalid
      else if (numericValue === 0) {
        numericValue = 1
      }

      const optionLabel = displayWeekday
        ? intl.formatDate(new Date(0, 0, numericValue), { weekday: 'long' })
        : intl.formatMessage(messages.purchaseDayLabel, { day: numericValue })

      options[optionLabel] = `${numericValue}`
    })

    return Object.entries(options).map(([label, value]) => ({ label, value }))
  }

  return inputDomain.map((value) => ({ label: value, value }))
}
