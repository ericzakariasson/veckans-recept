import PropTypes from 'prop-types'
import useMedia from 'use-media'
import { sizes } from '../style'

export const useMobile = () => useMedia({ maxWidth: sizes.mobile })

export const useDevice = (device = '') => useMedia({ maxWidth: sizes[device] })

useDevice.propTypes = {
  device: PropTypes.arrayOf([Object.keys(sizes)]),
}
