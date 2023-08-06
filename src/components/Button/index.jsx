import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export const BUTTON_VARIANT_PRIMARY = 'primary'
export const BUTTON_VARIANT_DELETE = 'delete'

/**
 * Generic button that extends and add styles to HTML `<button />` element
 *
 * @param {Object} props extends HTML `<button />` props
 * @param {string} props.variant Style variant for the button, default to "BUTTON_VARIANT_PRIMARY"
 *
 * @returns {JSX.Element} JSX Element of `<button />`
 */
export default function Button(props) {
  const { className, variant = BUTTON_VARIANT_PRIMARY } = props

  return (
    <button
      {...props}
      className={cx(className, styles.button, {
        [styles['button--variant-delete']]: variant === BUTTON_VARIANT_DELETE,
      })}
    />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([BUTTON_VARIANT_PRIMARY, BUTTON_VARIANT_DELETE]),
}
