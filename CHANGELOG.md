# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.11.1] - 2021-08-30
### Fixed
- prop `initiallyOpened` to the block `product-assembly-options`.

## [2.11.0] - 2021-04-22

### Added
- I18n Da, Fi, Ja, Ko, Ro

### Changed
- Crowdin configuration file.

## [2.10.6] - 2021-04-13

### Fixed
- Preventing `frequency` from `subscriptions` with whitespaces on the edges with `trim()` 
## [2.10.5] - 2021-04-01
### Fixed
- getGroupType to return type `SINGLE` only when min and max quantity is 1

## [2.10.4] - 2021-03-08

### Fixed 
- Fix crash when subscription is undefined
- Fix subscription option label when value doesn't have a number prefixed (monthly, yearly...)

## [2.10.3] - 2021-02-02
### Fixed
- AssemblyOptions tree deep Items quantities. Update parents of nodes that has been changed.

## [2.10.2] - 2021-01-13

### Fixed
- Update the app documentation to reflect the new subscription feature

## [2.10.1] - 2020-12-29
### Fixed
- Misspelled handle name causing build error

## [2.10.0] - 2020-12-07

### Added
- "Required" tag on assemblies groups
- Basic Translations on static texts
- CSS handles classes

## [2.9.5] - 2020-12-01
### Fixed
- Hard-coded `customize` string replaced with `FormattedMessage`.
- Prevent events from modal content being propagated to its react-tree parents.

## [2.9.4] - 2020-11-30
### Fixed
- ModalView customize error

## [2.9.3] - 2020-11-30
### Fixed
- Subscription messages for `es` and `pt` locales.

## [2.9.2] - 2020-11-13
### Fixed
- Subscription labels not being localized.

## [2.9.1] - 2020-08-31
### Fixed
- `README.md` file 

## [2.9.0] - 2020-08-18

### Added
- Prop `initiallyOpened` to `assembly-options-group`

## [2.8.3] - 2020-06-29
### Fixed
- Make selection when clicking in the item instead of needing to click on the Radio button or Checkbox.

## [2.8.2] - 2020-04-27
### Fixed
- `product-details.customizer` entry point.

## [2.8.1] - 2020-04-07
### Fixed
- Docs typo.

## [2.8.0] - 2020-03-26

### Added
- Make Input Values work for recursive assemblies.

## [2.7.0] - 2020-03-23

### Added
- Translation for Add and Remove buttons

## [2.6.6] - 2020-02-10
### Fixed
- Docs.

## [2.6.5] - 2019-10-22
### Fixed
- Avoid breaking if product doesn't have inputValues.

## [2.6.4] - 2019-10-08
### Added
- CSS class handles to the ProductAssemblyOptions' InputValues

## [2.6.3] - 2019-10-03
### Fixed
- Pass empty state of input values if optin is false to avoid adding unwanted input values.

## [2.6.2] - 2019-09-27

## [2.6.1] - 2019-09-27
### Added
- New README file.

## [2.6.0] - 2019-09-23
### Changed
- Change interface name
	- From: `assembly-option-item-input-values`
	- To: `assembly-option-input-values`

### Added
- Prop `optionsDisplay` to `assembly-option-input-values`

## [2.5.0] - 2019-09-20
### Added
- InputValues now might have default values.

## [2.4.0] - 2019-09-20
### Added
- Handle require field.

## [2.3.0] - 2019-09-16
### Added
- Interface `assembly-option-item-input-values`

### Fixed
- Messages scope

## [2.2.1] - 2019-09-13
### Fixed
- Selection of assembly item which can only choose one or another
- Recursive assembly option state

## [2.2.0] - 2019-09-10
### Added
- Allow `flex-layout` on interfaces.
- Added `buttonProps` for "Customize" button customization.

## [2.1.2] - 2019-08-29

## [2.1.1] - 2019-07-29
### Fixed
- Fix text type to show at `assembly-option-item-children-description`.

### Changed
- Save item group type in state.

## [2.1.0] - 2019-07-26
### Added
- Support recursive assembly options.
- New components:
	- `assembly-option-item-image`
	- `assembly-option-item-quantity-selector`
	- `assembly-option-item-name`
	- `assembly-option-item-price`
	- `assembly-option-item-customize`
	- `assembly-option-item-children-description`

## [2.0.7] - 2019-04-05
### Changed
- Always update SKU on `SKUSelector` callback.

## [2.0.6] - 2019-03-21
### Fixed
- Remove console logs and other minor fixes.

## [2.0.5] - 2019-03-21
### Changed
- Adapt to optimist minicart.

## [2.0.4] - 2019-03-14
### Changed
- Change messages file to most generic languages.

## [2.0.3] - 2019-03-01
### Changed
- Use SKUSelector component if there are variations in SKU

## [2.0.2] - 2019-02-26
### Fixed
- Adapt component to Checkout logic of adding items to cart with initialQuantity automatically

## [2.0.1] - 2019-02-25

## [2.0.0] - 2019-02-12

## [1.2.0] - 2019-02-05

## [1.1.2] - 2019-02-05
### Changed
- Add `ProductDetails` as a block.

## [1.1.1] - 2019-01-29
### Fixed
- Remove `inheritComponent` from blocks.

## [1.1.0] - 2019-01-18
### Changed
- Update React builder to 3.x.

## [1.0.0] - 2019-01-10
### Changed
- Add support to store and messages builders.

## [0.2.12] - 2018-11-07
### Fixed
- Check if calculatedAttachment is not nil

## [0.2.10] - 2018-11-07

### Fixed

- Fixes ingredients auto-scroll positioning on mobile--previously it was missing the mark by a few pixels.

## [0.2.9] - 2018-11-07

### Changed
- Updated image size on ToggledChoice to match MultipleChoice

## [0.2.8] - 2018-11-07
### Fixed
- Several issues with the component rendering with erros with different attachment configurations

## [0.2.7] - 2018-11-07

### Changed

- Use the lean mode of the NumericStepper component on MultipleChoice

### Fixed

- Adjust the auto-scroll-to-ingredients function to scroll right to the header of the Ingredients section
- Fix spinner alignment to match the one that comes from the parent component

## [0.2.6] - 2018-11-06

## [0.2.5] - 2018-11-06

## [0.2.4] - 2018-10-25

## [0.2.3] - 2018-10-25

## [0.2.2] - 2018-10-25

## [0.2.1] - 2018-10-24

### Added
- MVP of `Product Customizer` app.
