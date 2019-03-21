import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Grid } from '@material-ui/core';
import RecipeInfo from './RecipeInfoFormFragment';
import RecipeCover from './RecipeCoverFormFragment';
import RecipeIngredients from './RecipeIngredientsFormFragment';
import RecipeCookSteps from './RecipeCookStepsFormFragment';
import * as yup from 'yup';

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

const recipeFormValidationSchema = yup.object().shape({
  title: yup.string()
    .max(100, 'Maxmum of 100 characters.')
    .required('Your recipe must have a title.'),
  subtitle: yup.string()
    .max(100, 'Maxmum of 100 characters.')
    .required('subtitle is required.'),
  description: yup.string()
    .max(300, 'Maxmum of 300 characters.')
    .required(),
  coverImage: yup.string()
    .required('Recipe needs a cover image.'),
  ingredients: yup.array()
    .of(
      yup.object().shape({
        name: yup.string()
          .max(100, 'Maxmum of 100 characters.')
          .required('Name of ingerident is required.'),
        quantity: yup.string()
          .max(100, 'Maxmum of 100 characters.')
          .required('Quantity of ingredent is required.')
      })
    )
    .required('Must have some ingerident.')
    .min(3, 'Minimum of 3 ingeridents.'),
  cookSteps: yup.array()
    .of(
      yup.object().shape({
        instruction: yup.string()
          .max(200, 'Maxmum of 200 characters.')
          .required('Instruction is required.')
      })
    )
    .required('Must have some cooking steps.')
    .min(3, 'Minimum of 3 steps.')
});

class EditRecipe extends Component {
  static propTypes = {
    // handleSubmit: PropTypes.func.isRequired,
    // initialValues: PropTypes.object,
  };

  renderForm = properties => {
    return (
      <Form>
        <RecipeInfo {...properties} />
        <RecipeCover {...properties} />
        <RecipeIngredients {...properties} />
        <RecipeCookSteps {...properties} />
      </Form>
    );
  };

  handleSubmitTest = values => {
    console.log("entry submit function...")
    console.log(values);
    return;
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
              onSubmit={this.handleSubmitTest} 
              validationSchema={recipeFormValidationSchema}
              render={props => this.renderForm(props)}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditRecipe);