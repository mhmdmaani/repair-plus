import { TruckType } from 'prisma/prisma-client';

export const initialState = {
  user: null,
  isTabBarTransparent: false,
  isHiddenTabBar: false,
  displayAuthModal: false,
  mode: 'light',
  selectedVan: null,
  originObj: null,
  destinationObj: null,
  waypoints: [],
  path: [],
  start: null,
  end: null,
  directions: null,
  // confirm
  collection: null,
  delivery: null,
  collectionDates: {
    selectedDate: new Date(),
    dateType: '0',
    fromTime: '00:00',
    toTime: '00:00',
  },
  deliveryDates: {
    selectedDate: new Date(),
    dateType: '3',
    fromTime: '00:00',
    toTime: '00:00',
  },
  collectionCity: null,
  collectionPostalCode: null,
  deliveryCity: null,
  deliveryPostalCode: null,
  withDriver: false,
  paymentMethod: 'bill',
  order: null,
  email: null,
  additionalTime: 0,
};

// dashboard

export type GlobalStateType = {
  user: any;
  isTabBarTransparent: boolean;
  isHiddenTabBar: boolean;
  displayAuthModal: boolean;
  mode: string;
  selectedVan: TruckType | null;
  originObj: any;
  destinationObj: any;
  waypoints: any[];
  path: any[];
  start: any;
  end: any;
  directions: any;
  collection: any;
  delivery: any;
  collectionDates: any;
  deliveryDates: any;
  collectionCity: any;
  collectionPostalCode: any;
  deliveryCity: any;
  deliveryPostalCode: any;
  withDriver: boolean;
  paymentMethod: string;
  order: any;
  email: any;
  additionalTime: number;
};

type Action = {
  type: string;
  payload: any;
};

export const reducer = (state: GlobalStateType, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_DISPLAY_AUTH_MODAL':
      return {
        ...state,
        displayAuthModal: action.payload,
      };

    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'SET_SELECTED_VAN':
      return {
        ...state,
        selectedVan: action.payload,
      };
    case 'SET_ORIGIN_OBJ':
      return {
        ...state,
        originObj: action.payload,
      };

    case 'SET_DESTINATION_OBJ':
      return {
        ...state,
        destinationObj: action.payload,
      };
    case 'SET_WAYPOINTS':
      return {
        ...state,
        waypoints: action.payload,
      };
    case 'SET_PATH':
      return {
        ...state,
        path: action.payload,
      };
    case 'SET_START':
      return {
        ...state,
        start: action.payload,
      };
    case 'SET_END':
      return {
        ...state,
        end: action.payload,
      };
    case 'SET_DIRECTIONS':
      return {
        ...state,
        directions: action.payload,
      };
    case 'SET_START_END_PATH':
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
        path: action.payload.path,
      };
    case 'SUBMIT_CREATE_QUOTE':
      return {
        ...state,
        ...action.payload,
      };

    case 'SET_CITIES_AND_POSTCODES':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_COLLECTION_DATE':
      return {
        ...state,
        collectionDates: action.payload,
      };
    case 'SET_COLLECTION':
      return {
        ...state,
        collection: action.payload,
      };
    case 'SET_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
      };
    case 'SET_DELIVERY_DATE':
      return {
        ...state,
        deliveryDates: action.payload,
      };

    case 'SET_WITH_DRIVER':
      return {
        ...state,
        withDriver: action.payload,
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
      };

    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_ADDITIONAL_TIME':
      return {
        ...state,
        additionalTime: action.payload,
      };
    case 'RESET':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
