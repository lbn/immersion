import React from 'react';
import { Navbar, Nav, NavItem, Button, Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import update from 'immutability-helper';

import styles from './index.scss';
import ArticleService from './service_article.js';
import Sentence from './sentence.jsx';
import Article from './article.jsx';
import EditTranslation from './edit_translation.jsx';


export default class ArticleOriginal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSentence: null,
			article: {translated: null, original: null},
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.submitTranslation = this.submitTranslation.bind(this);

		this.articleService = new ArticleService();
		Promise.all([
				this.articleService.getOriginal(props.params.id),
				this.articleService.getTranslated(props.params.id),
		]).then(values => {
			const [original, translated] = values;
			this.setState(prevState => ({
				article: {original: original, translated: translated},
			}));
		});
	}
	handleSelect(sentence) {
		this.setState(prevState => ({
			selectedSentence: sentence.props.id,
		}));
	}

	selectedSentenceText(type) {
		const validTypes = ["original", "translated"];
		if (!validTypes.includes(type) || this.state.article[type] == null) {
			return null
		}
		let sentence = this.state.article[type].sentences[this.state.selectedSentence];
		return sentence ? sentence.text : "";
	}

	submitTranslation(translation) {
		return this.articleService.submitTranslation(this.props.params.id, this.state.selectedSentence, translation)
			.then(() => {
				let sentenceUpdate = {};
				sentenceUpdate[this.state.selectedSentence] = {text: {$set: translation}};

				this.setState({
					article: update(this.state.article, {
						translated: {
							sentences: sentenceUpdate
						}
					})
				});
			});
	}

  render() {
    return (
				<Row>
					<Col md={8}>
						<Article
						handleSelect={this.handleSelect}
						selectedSentence={this.state.selectedSentence}
						article={this.state.article} />
					</Col>
					<Col md={4}>
						<EditTranslation
						selectedSentence={this.state.selectedSentence}
						original={this.selectedSentenceText("original")}
						translated={this.selectedSentenceText("translated")}
						submitTranslation={this.submitTranslation}
						/>
					</Col>
				</Row>
    )
  }
}
