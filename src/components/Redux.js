export const reducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "REMOVE":
            return {
                ...state,
                item: state.item.filter((element) => {
                    return element.id !== action.payload
                }),
            }
    }
}