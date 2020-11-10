import { defineMessages, IntlShape } from 'react-intl'

const messages = defineMessages({
  subscription: { id: 'store/product-customizer.subscription' },
  frequency: { id: 'store/product-customizer.subscription.frequency' },
  purchaseday: { id: 'store/product-customizer.subscription.purchaseday' },
})

function getSubscriptionId(item: AssemblyOptionGroupState | OptionsInputValue) {
  if ('label' in item) return item.label
  if ('groupName' in item) return item.groupName

  return undefined
}

export function isSubscription(
  item: AssemblyOptionGroupState | OptionsInputValue
) {
  return Boolean(getSubscriptionId(item)?.indexOf('vtex.subscription') === 0)
}

function getSubscriptionMessageId(
  item: AssemblyOptionGroupState | OptionsInputValue
) {
  const id = getSubscriptionId(item)

  if (!id) {
    return undefined
  }

  // uses the 'keyName' of vtex.subscription.key.{keyName}
  if (id.indexOf('vtex.subscription.key') === 0) {
    return messages[id as keyof typeof messages]
  }

  // uses 'subscriptions' for vtex.subscription.*
  if (id.indexOf('vtex.subscription') === 0) {
    return messages.subscription
  }

  return undefined
}

export function formatSubscriptionLabel(
  item: AssemblyOptionGroupState | OptionsInputValue,
  intl: IntlShape
) {
  const id = getSubscriptionMessageId(item)

  if (!id) {
    return null
  }

  return intl.formatMessage(id)
}
