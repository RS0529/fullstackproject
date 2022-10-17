import React, { Component, Fragment } from "react";

import Modal from '../../Modal/Modal'
import Input from "../../Form/Input/Input";
import FilePicker from "../../Form/Input/FilePicker";
import Image from "../../Image/Image"

import { required, length } from "../../../utils/validations";
import { generateBase64FromImage } from "../../../utils/image";

const POST_FORM = {
    title: {
        value: '',
        valid: false,
        touched: false,
        validations: [required, length({min: 5})]
    },
    image: {
        value: '',
        valid: false,
        touched: false,
        validations: [required]
    },
    content: {
        value: '',
        valid: false,
        touched: false,
        validations: [required, length({min: 5})]
    }
}

class FeedEdit extends Component {
    state = {
        postForm: POST_FORM,
        formIsValid: false,
        imagePreview: null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.editing && prevProps.editing !== this.props.editing && prevProps.selectedPost !== this.props.selectedPost) {
            const postForm = {
                title: {
                    ...prevState.postForm.title,
                    value: this.props.selectedPost.title,
                    valid: true
                },
                image: {
                    ...prevState.postForm.image,
                    value: this.props.selectedPost.imagePath,
                    valid: true
                },
                content: {
                    ...prevState.postForm.content,
                    value: this.props.selectedPost.content,
                    valid: true
                }
            }
            this.setState({postForm: postForm, formIsValid: true})
        }
    }

    postInputChangeHandler = (input, value, files) => {}

    inputBlurHandler = input => {
        this.setState(prevState => {
            return {
                postForm: {
                    ...prevState.postForm,
                    [input]: {
                        ...prevState.postForm[input],
                        touched: true
                    }
                }
            }
        })
    }

    cancelPostChangeHandler = () => {
        this.setState({
            postForm: POST_FORM,
            formIsValid: false,
            imagePreview: null
        })
        this.props.onCancelEdit()
    }

    acceptPostChangeHandler = () => {
        const post = {
            title: this.state.postForm.title.value,
            image: this.state.postForm.image.value,
            content: this.state.postForm.content.value,
        }
        this.props.onFinishEdit(post)
        this.setState({
            postForm: POST_FORM,
            formIsValid: false,
            imagePreview: null
        })
    }

    render() {
        return this.props.editing ? (
            <Fragment>
                <Modal
                    title="New Post"
                    acceptEnabled={this.state.formIsValid}
                    onCancelModal={this.cancelPostChangeHandler}
                    onAcceptModal={this.acceptPostChangeHandler}
                    isLoading={this.props.loading}
                >
                    <form>
                        <Input
                            id="title"
                            label="Title"
                            control="input"
                            onChange={this.postInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'title')}
                            valid={this.state.postForm['title'].valid}
                            touched={this.state.postForm['title'].touched}
                            value={this.state.postForm['title'].value}
                        />
                        <FilePicker
                            id="image"
                            label="Image"
                            control="input"
                            onChange={this.postInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'image')}
                            valid={this.state.postForm['image'].valid}
                            value={this.state.postForm['image'].value}
                        />
                        <div className="new-post__preview-image">
                            {!this.state.imagePreview && <p>Please choose an image</p>}
                            {this.state.imagePreview && (
                                <Image imageUrl={this.state.imagePreview} contain left />
                            )}
                        </div>
                        <Input
                            id="content"
                            label="Content"
                            control="content"
                            onChange={this.postInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'content')}
                            valid={this.state.postForm['content'].valid}
                            touched={this.state.postForm['content'].touched}
                            value={this.state.postForm['content'].value}
                        />
                    </form>
                </Modal>
            </Fragment>
        ) : null
    }
}

export default FeedEdit