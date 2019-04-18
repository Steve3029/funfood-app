import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import RecipeForm from './RecipeForm';

export class AddNewRecipe extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.actions.addRecipe(values);
  }

  render() {
    return (
      <RecipeForm handleSubmit={this.handleSubmit} />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewRecipe);
