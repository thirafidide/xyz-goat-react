import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export const BUTTON_VARIANT_PRIMARY = 'primary'
export const BUTTON_VARIANT_DELETE = 'delete'

/**
 * Generic button that extends and add styles to HTML `<button />` element
 *
 * @param {Object} props extends HTML `<button />` props
 * @param {"primary" | "delete"} props.variant Style variant for the button. Use const exported from Button file to use. Default to "BUTTON_VARIANT_PRIMARY"
 *
 * @returns {JSX.Element} JSX Element of `<button />`
 */
export default function Button(props) {
  const { className, disabled, variant = BUTTON_VARIANT_PRIMARY } = props

  return (
    <button
      {...props}
      className={cx(className, styles.button, {
        [styles['button--variant-delete']]: variant === BUTTON_VARIANT_DELETE,
        [styles['button--disabled-true']]: disabled,
      })}
    />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([BUTTON_VARIANT_PRIMARY, BUTTON_VARIANT_DELETE]),
}
