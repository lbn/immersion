import { CALL_API } from "../middleware/api"


const REQUEST = "REQUEST"
const SUCCESS = "SUCCESS"
const FAILURE = "FAILURE"

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const ARTICLE_LIST = createRequestTypes("ARTICLE_LIST");

export const articleList = (lang) => ({
	[CALL_API]: {
		types: ARTICLE_LIST,
		endpoint: `article/list/${lang.original}/${lang.target}`
	}
});

export const loadArticleList = () => (dispatch, getState) => {
	return dispatch(articleList(getState().lang));
};

export const LANGUAGE_LIST = createRequestTypes("LANGUAGE_LIST");

export const languagesList = () => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: LANGUAGE_LIST,
		endpoint: `language/list`
	}
});

export const UPLOAD_URL = createRequestTypes("UPLOAD_URL");

export const uploadURL = (url) => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: UPLOAD_URL,
		endpoint: `upload/url`,
		data: {
			method: "POST",
			body: {url, lang: getState().lang}
		}
	}
});

export const UPLOAD_TEXT = createRequestTypes("UPLOAD_TEXT");

export const uploadText = (title, text) => (dispatch, getState) => dispatch({
	[CALL_API]: {
		types: UPLOAD_TEXT,
		endpoint: `upload/text`,
		data: {
			method: "POST",
			body: {title, text, lang: getState().lang}
		}
	}
});

export const changeLanguages = (lang) => (dispatch, getState) => dispatch({
	type: "CHANGE_LANGUAGES",
	lang: lang
});
