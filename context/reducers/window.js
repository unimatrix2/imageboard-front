export default function getWindow(state, action) {
    switch (action.type) {
        case 'PROVIDE-WINDOW':
            return  { ...state, deviceWindow: action.payload };
        default:
            return state;
    }
}