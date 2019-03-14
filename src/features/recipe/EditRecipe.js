import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Grid } from '@material-ui/core';
import RecipeInfo from './RecipeInfoFormFragment';
import RecipeCover from './RecipeCoverFormFragment';
import RecipeIngredients from './RecipeIngredientsFormFragment';

const styles = theme => ({
  root: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fieldMargin: {
    marginBottom: theme.spacing.unit * 4,
  },
});

class EditRecipe extends Component {
  static propTypes = {
    // handleSubmit: PropTypes.func.isRequired,
    // initialValues: PropTypes.object,
  };

  renderForm = properties => {
    const { classes } = properties;
    return (
      <Form>
        <RecipeInfo {...properties} />
        <RecipeCover {...properties} />
        <RecipeIngredients {...properties} />
      </Form>
    );
  };

  render() {
    const { classes, handleSubmit, initialValues } = this.props;
    return (
      <Grid
        container
        spacing={8}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <div className={classes.root}>
            <Formik
              onSubmit={handleSubmit} 
              render={props => this.renderForm(props)}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditRecipe);