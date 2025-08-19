// Initial state for creating a project
export const INITIAL_STATE = {
  professorId: JSON.parse(localStorage.getItem("currentUser"))?._id || "", // professorId from logged-in user
  title: "",
  domain: "", // project domain
  cover: "",
  images: [],
  desc: "", // detailed project description
  shortTitle: "", // research focus
  shortDesc: "", // expected student contribution
  durationWeeks: 0, // project duration in weeks
  positionsAvailable: 0, // number of available positions
  requirements: [], // requirements list
  stipend: 0, // optional stipend
};

// Reducer for handling project form state
export const projectReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        requirements: [...state.requirements, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        requirements: state.requirements.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
