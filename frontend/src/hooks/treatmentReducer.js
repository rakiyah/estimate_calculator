
export function treatmentReducer(treatments, action) {
  switch (action.type) {
    case 'SET_TREATMENTS':
      console.log('[SET_TREATMENTS] Payload:', action.payload)
      return action.payload
    case 'ADD_TREATMENT': {
      console.log('Action:', action)
      const { code, category, description, fee, covered, write_off } = action.savedTreatment;
      return [
        ...treatments,
        { code, category, description, fee, covered, write_off }
      ]
    }
  }
}
