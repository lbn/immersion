import log from 'loglevel';

export default class ArticleService {
	constructor() {
		this.baseURL = "/api";
	}

	getList(id) {
		log.debug(`ArticleService.list(id:${id})`);
		return fetch(`${this.baseURL}/article/list`).then(a => {
			return a.json();
		});
	}

	getOriginal(id) {
		log.debug(`ArticleService.getOriginal(id:${id})`);
		return fetch(`${this.baseURL}/article/${id}/original`).then(a => {
			return a.json();
		});
	}

	getTranslated(id) {
		log.debug(`ArticleService.getTranslated(id:${id})`);
		return fetch(`${this.baseURL}/article/${id}/translated`).then(a => {
			return a.json();
		});
	}

	submitTranslation(id, sentenceID, translation) {
		log.debug(`ArticleService.getTranslated(articleID:${id},sentenceID:${sentenceID},translation:${translation})`);
		return fetch(`${this.baseURL}/article/${id}/translate`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({sentenceID: sentenceID, translation: translation}),
		}).then(a => {
			return a.json();
		});
	}

	uploadText(title, text) {
		log.debug(`ArticleService.uploadText(title:${title},text:${text})`);
		return fetch(`${this.baseURL}/upload/text`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({title: title, text: text}),
		}).then(a => {
			return a.json();
		});
	}
}
