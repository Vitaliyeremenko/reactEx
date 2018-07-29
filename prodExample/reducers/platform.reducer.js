import { platformConstants } from '../constants';

const initialState = {
  socials: [
    {
      label: 'Instagram',
      value: 'instagram',
      icon: 'instagram'
    },
    {
      label: 'Facebook',
      value: 'facebook',
      icon: 'facebook'
    },
    {
      label: 'YouTube',
      value: 'youtube',
      icon: 'youtube'
    },
    {
      label: 'Telegram',
      value: 'telegram',
      icon: 'telegram'
    },
  ]
}

export function platform(state = initialState || {}, action) {
  switch(action.type) {
    case platformConstants.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case platformConstants.GET_ALL_CATEGORIES_SUCCESS:
      const categories = [];

      action.categories.map(category => {
        const { name, id } = category;

        categories.push({
          id,
          label: name,
          value: name,
        });
      });

      return {
        ...state,
        fetching: false,
        categories,
      }
      
    case platformConstants.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        fetching: false
      }

    case platformConstants.GET_ALL_FORMATS_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case platformConstants.GET_ALL_FORMATS_SUCCESS:
      return {
        ...state,
        fetching: false,
        formats: action.formats
      }
    case platformConstants.GET_ALL_FORMATS_FAILURE:
      return {
        ...state,
        fetching: false
      }
    case platformConstants.GET_ALL_AD_TYPES_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case platformConstants.GET_ALL_AD_TYPES_SUCCESS:
      const adTypes = [];

      action.adTypes.map(adType => {
        const { name, id } = adType;

        adTypes.push({
          id,
          label: name,
          value: name,
        });
      });

      return {
        ...state,
        adTypes,
        fetching: false
      }
    case platformConstants.GET_ALL_AD_TYPES_FAILURE:
      return {
        ...state,
        fetching: false
      }
    default:
      return state;
  }
}