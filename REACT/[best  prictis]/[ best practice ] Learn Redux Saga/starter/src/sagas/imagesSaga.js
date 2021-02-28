import { takeEvery, select, call, put } from "redux-saga/effects";
import { IMAGES } from "../constants";
import { fetchImagesAPI } from "../api";
import { setImages, setError } from "../actions";

export const getPage = state => state.nextPage;

export function* hadleImagesLoad() {
    try {
        const page = yield select(getPage);
        const images = yield call(fetchImagesAPI, page);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, hadleImagesLoad);
}
