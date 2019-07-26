# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
