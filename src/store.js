import { configureStore, createSlice } from "@reduxjs/toolkit";

// coordinates를 저장할 slice를 생성합니다.
const coordinatesSlice = createSlice({
    name: "coordinates",
    initialState: [],
    reducers: {
        // coordinates를 업데이트하는 액션을 생성합니다.
        updateCoordinates(state, action) {
            return action.payload; // 새로운 coordinates로 상태를 업데이트합니다.
        },
    },
});

// 스토어 생성
export default configureStore({
    reducer: {
        coordinates: coordinatesSlice.reducer, // slice를 스토어에 등록합니다.//작명 : 
    },
});
// 액션을 외부로 내보냅니다.
export const { updateCoordinates } = coordinatesSlice.actions;
