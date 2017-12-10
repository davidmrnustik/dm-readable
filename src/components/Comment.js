import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CommentForm from './CommentForm';
import CommentDetail from './CommentDetail';
import { modifyComment } from '../actions/comments';
import { styles } from './common/styles';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  state = {
    comment: Object.assign({}, this.props.comment),
    modifyCommentModal: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comment: Object.assign({}, this.state.comment, nextProps.comment)});
  }

  openModifyCommentModal = () => {
    this.setState(() => ({
      modifyCommentModal: true
    }))
  }

  closeModifyCommentModal = () => {
    this.setState(() => ({
      modifyCommentModal: false
    }))
  }

  onChangeFormControl = event => {
    const field = event.target.name;
    let comment = Object.assign({}, this.state.comment);
    comment[field] = event.target.value;
    return this.setState({ comment });
  }

  onSubmitModifyComment = event => {
    event.preventDefault();
    this.props.dispatch(modifyComment(this.state.comment));
    this.closeModifyCommentModal();
  }

  onSubmitDeleteComment = event => {
    event.preventDefault();
    this.props.dispatch(modifyComment(this.state.comment, 'remove'));
    this.closeModifyCommentModal();
  }

  render() {
    const { comment } = this.props;
    const { modifyCommentModal } = this.state;

    return (
      <div className='comment'>
        <CommentDetail
          {...comment}
          onClickModify={this.openModifyCommentModal}
          onClickDelete={this.onSubmitDeleteComment}
        />

        <Modal
          isOpen={modifyCommentModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModifyCommentModal}
          shouldCloseOnEsc={true}>
          
          <CommentForm
            onSubmit={this.onSubmitModifyComment}
            modify={true}
            comment={this.state.comment}
            onChange={this.onChangeFormControl}
          />

          <button
            onClick={() => this.closeModifyCommentModal()}
            style={styles.modalClose}
          >
            Close
          </button>
        </Modal>
      </div>
    )
    
  }
}

export default connect()(Comment);