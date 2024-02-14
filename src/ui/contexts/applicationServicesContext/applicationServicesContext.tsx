import applicationServicesMap from '@/src/config/applicationServicesMap'
/**
 * Exposes an instance of ApplicationServicesMap
 * to control access from the React application
 */
const useApplicationServices = () => applicationServicesMap

export { useApplicationServices }
