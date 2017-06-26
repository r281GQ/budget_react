import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { push } from "react-router-redux";
import {
  createGrouping,
  updateGrouping,
  deleteGrouping
} from "./../actionCreators/modelActionCreators";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import * as _ from "lodash";
import Spinner from "react-spinkit";
import GropingComponentList from "./grouping.list-component";
import GroupingCreateComponent from "./grouping-create-component";


class GroupingComponent extends Component {
  prepareCreateGroupingForDispatch = formProps => {
    let { name, type } = formProps;
    let { reset, createGrouping } = this.props;
    createGrouping({ name, type });
    this.setState({ showCreateForm: false }, () => reset());
  };

  componentWillMount() {
    if (!this.props.authenticated) this.props.navigate('/');
  }

  componentWillUpdate(nextprops) {
    if (!nextprops.authenticated) this.props.navigate('/');
  }

  constructor(props) {
    super(props);

    this.state = {
      showEditForm: false,
      showDeleteConsent: false,
      selectedId: undefined,
      showCreateForm: false
    };
  }


  onSubmitEditHandler = () => {
    let { handleSubmit } = this.props;
    return handleSubmit(this.prepareUpdateGroupingForDispatch);
  };

  prepareUpdateGroupingForDispatch = ({ name }) => {
    let _id = this.state.selectedId;
    let { reset, updateGrouping } = this.props;
    updateGrouping({ _id, name });
    this.setState({ showEditForm: false }, () => reset());
  };

  onSubmitCreateHandler = () => {
    let { handleSubmit } = this.props;
    return handleSubmit(this.prepareCreateGroupingForDispatch);
  };

  onEditFormSelectedHandler = _id => () => {
    let { name } = this.selectedGrouping(_id);
    this.props.change("name", name);
    this.setState(
      {
        showCreateForm: false
      },
      () =>
        this.setState({
          selectedId: _id,
          showEditForm: true
        })
    );
  };

  onEditFormDisabledHandler = () => {
    let { reset } = this.props;
    reset();
    this.setState({ showEditForm: false });
  };
  renderCreateGroupingForm = () => {
    return (
      <GroupingCreateComponent
        onSubmitCreateHandler={this.onSubmitCreateHandler}
        showCreateForm={this.state.showCreateForm}
        onShowCreateFormHandler={this.onShowCreateFormHandler}
        onHideCreateFormHandler={this.onHideCreateFormHandler}
        invalid={this.props.invalid}
        touched={this.props.dirty}
      />
    );
  };

  onHideCreateFormHandler = () => {
    let { reset } = this.props;
    reset();
    this.setState({ showCreateForm: false, selectedId: undefined });
  };

  onDeleteGroupingHandler = _id => () => {
    this.props.deleteGrouping(_id);
    this.setState({showDeleteConsent: false})
  }

  onShowDeleteConsentHandler = _id => () =>
    this.setState(
      {
        showCreateForm: false
      },
      () =>
        this.setState({
          selectedId: _id,
          showDeleteConsent: true
        })
    );

  onHideDeleteConsentHandler = _id => () =>
    this.setState({ showDeleteConsent: false });

  onShowCreateFormHandler = () => {
    let { reset } = this.props;
    reset();

    this.setState({ showEditForm: false, showDeleteConsent: false }, () =>
      this.setState({ showCreateForm: true }, () => {
        this.props.change("name", "");
        this.props.change("type", "income");
      })
    );
  };

  selectedGrouping = _id => this.props.groupings[_id];

  render() {
    let { invalid } = this.props;
    if (this.props.loading) return <div><Spinner name="double-bounce" /></div>;
    return (
      <div>
        <div>
          {this.renderCreateGroupingForm()}
        </div>
        <GropingComponentList
          groupings={this.props.groupings}
          state={this.state}
          handlers={{
            onSubmitEditHandler: this.onSubmitEditHandler,
            onEditFormSelectedHandler: this.onEditFormSelectedHandler,
            onEditFormDisabledHandler: this.onEditFormDisabledHandler,
            onDeleteGroupingHandler: this.onDeleteGroupingHandler,
            onHideDeleteConsentHandler: this.onHideDeleteConsentHandler,
            onShowDeleteConsentHandler: this.onShowDeleteConsentHandler,
            onShowCreateFormHandler: this.onShowCreateFormHandler
          }}
          invalid = {invalid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.auth.authenticated,
    groupings: state.model.groupings.data,
    loading: state.model.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGrouping: grouping => dispatch(createGrouping(grouping)),
    redirectToMain: () => dispatch(push("/")),
    navigate: route => dispatch(push(route)),
    updateGrouping: grouping => dispatch(updateGrouping(grouping)),
    deleteGrouping: _id => dispatch(deleteGrouping(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "grouping"
  })(GroupingComponent)
);
