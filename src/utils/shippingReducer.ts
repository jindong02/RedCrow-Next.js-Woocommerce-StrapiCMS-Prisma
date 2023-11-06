// Define the types for your shipping data
interface ShippingData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  company: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
}

// Define action types
enum ActionTypes {
  UPDATE_FIELD = "UPDATE_FIELD",
}

// Define action interfaces
interface UpdateFieldAction {
  type: ActionTypes.UPDATE_FIELD;
  field: keyof ShippingData;
  value: string;
}

type Action = UpdateFieldAction;

// Define the initial state
const initialState: ShippingData = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  company: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
  email: "",
};

// Create the reducer function
function shippingReducer(state: ShippingData, action: Action): ShippingData {
  switch (action.type) {
    case ActionTypes.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

export { shippingReducer, ActionTypes, initialState };
